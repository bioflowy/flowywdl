import { Logger } from "./logger.ts";
import { ConfigParser } from "./configparser.ts";
import { existsSync, getEnv, path, readFileSync } from "../runtimeutils.ts";

type ConfigValue = string | number | boolean | object | null;
type ConfigDict = { [key: string]: ConfigValue };

/**
 * Configuration section accessor
 */
class Section {
    private section: string;
    private parent: Loader;

    constructor(parent: Loader, section: string) {
        this.parent = parent;
        this.section = section;
    }

    get(key: string, defaultValue?: string): string {
        return this.parent.get(this.section, key, defaultValue);
    }

    getInt(key: string, defaultValue?: number): number {
        return this.parent.getInt(this.section, key, defaultValue);
    }

    getFloat(key: string, defaultValue?: number): number {
        return this.parent.getFloat(this.section, key, defaultValue);
    }

    getBoolean(key: string, defaultValue?: boolean): boolean {
        return this.parent.getBoolean(this.section, key, defaultValue);
    }

    getDict(key: string, defaultValue?: ConfigDict): ConfigDict {
        return this.parent.getDict(this.section, key, defaultValue);
    }

    getList(key: string, defaultValue?: any[]): any[] {
        return this.parent.getList(this.section, key, defaultValue);
    }
}

/**
 * Configuration loader error
 */
class ConfigMissing extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ConfigMissing";
    }
}

/**
 * Main configuration loader class
 */
export class Loader {
    private logger: Logger;
    private defaults: ConfigParser;
    private options: ConfigParser;
    private overrides: ConfigParser;
    private used: Set<string>;
    private usedEnv: Set<string>;
    cfgFilename?: string;

    /**
     * Initialize configuration loader
     * @param logger Logger instance
     * @param filenames Optional list of config file paths to try
     * @param overrides Optional configuration overrides
     */
    constructor(
        logger: Logger,
        filenames?: string[],
        overrides?: ConfigParser,
    ) {
        this.logger = logger;
        this.used = new Set();
        this.usedEnv = new Set(["MINIWDL_CFG"]);
        this.defaults = new ConfigParser();
        this.options = new ConfigParser();
        this.overrides = new ConfigParser();
        
        // Load default config
        const defaultCfg = path.join(
            import.meta.dirname || "./",
            "config_templates",
            "default.cfg",
        );
        this.logger.debug({
            msg: "read configuration defaults",
            filename: defaultCfg,
        });
        this.defaults = this.readConfigFile(defaultCfg);
        // Load user config if available
        if (filenames === undefined) {
            const cfg_path = getEnv("MINIWDL_CFG");
            if (cfg_path) {
                filenames = cfg_path.split(":");
            } else {
                const configDirs = [
                    ...this.getXdgConfigDirs(),
                    this.getXdgConfigHome(),
                ].reverse();
                filenames = configDirs.map((dir) =>
                    path.join(dir, "miniwdl.cfg")
                );
            }
        }

        if (filenames.length) {
            this.logger.debug({
                msg: "searching for configuration files",
                filenames,
            });
            
            const existingFiles = filenames.filter((fn) => {
                const ex = existsSync(fn)
                return ex
            });
            if (existingFiles.length) {
                this.logger.info({
                    msg: "read configuration file",
                    path: existingFiles[0],
                });
                this.options = this.readConfigFile(existingFiles[0]);
                this.cfgFilename = existingFiles[0];
            } else {
                this.logger.info("no configuration file found");
            }
        }

        // Apply overrides
        if (overrides) {
            this.override(overrides);
        }
    }

    /**
     * Apply configuration overrides
     */
    override(options: ConfigParser): void {

        for (const [section, values] of Object.entries(options)) {
            if (Object.keys(values).length) {
                this.overrides.addSection(section);
                for (const [key, value] of Object.entries(values)) {
                    const processedValue = this.processValue(value);
                    if (processedValue !== undefined) {
                        this.overrides.set(section,key,processedValue);
                    }
                }
            }
        }

        if (Object.keys(options).length) {
            this.logger.debug({
                msg: "applying configuration overrides",
                ...options,
            });
        }
    }
    has_section(section: string): boolean {
        return (
            this.defaults.hasSection(section) ||
            this.options.hasSection(section) ||
            this.overrides.hasSection(section)
        );
    }
    hasOption(section:string,option:string):boolean{
        try{
            this.get(section,option)
            return true;
        }catch{
            return false;
        }
    }
    /**
     * Get configuration value
     */
    get(section: string, key: string, defaultValue?: string): string {
        section = section.toLowerCase();
        key = key.toLowerCase();
        let value: string | undefined;

        // Check overrides first
        if (this.overrides.hasOption(section, key)) {
            value = this.overrides.get(section, key);
        } else {
            // Check environment variables
            const envKey = this.getEnvVarName(section, key);
            if (getEnv(envKey)) {
                value = getEnv(envKey);
                this.usedEnv.add(envKey);
            } // Check config file
            else if (this.options.hasOption(section, key)) {
                value = this.options.get(section, key);
            } // Check defaults
            else if (this.defaults.hasOption(section, key)) {
                value = this.defaults.get(section, key);
            }
        }

        if (value === undefined) {
            if (defaultValue !== undefined) {
                return defaultValue;
            }
            if (!this.hasSection(section)) {
                throw new ConfigMissing(`missing config section [${section}]`);
            }
            throw new ConfigMissing(
                `missing config option [${section}] ${key}`,
            );
        }

        this.used.add(`${section}:${key}`);
        value = this.stripValue(value);

        // Expand environment variables unless explicitly excluded
        if (!this.isExcludedFromEnvExpansion(section, key)) {
            value = this.expandEnvVars(value);
        }

        return value;
    }
    hasSection(section: string): boolean{
        return (
            this.defaults.hasSection(section)
            || this.options.hasSection(section)
            || this.overrides.hasSection(section)
        )
    }

    /**
     * Get typed configuration values
     */
    getInt(section: string, key: string, defaultValue?: number): number {
        return this.parseValue(
            section,
            key,
            "int",
            (v: string) => parseInt(v, 10),
            defaultValue,
        );
    }

    getFloat(section: string, key: string, defaultValue?: number): number {
        return this.parseValue(
            section,
            key,
            "float",
            (v: string) => parseFloat(v),
            defaultValue,
        );
    }

    getBoolean(section: string, key: string, defaultValue?: boolean): boolean {
        return this.parseValue(
            section,
            key,
            "boolean",
            this.parseBoolean,
            defaultValue,
        );
    }

    getDict(
        section: string,
        key: string,
        defaultValue?: ConfigDict,
    ): ConfigDict {
        return this.parseValue(
            section,
            key,
            "JSON dict",
            (v: string) => JSON.parse(v),
            defaultValue,
        );
    }

    getList(section: string, key: string, defaultValue?: any[]): any[] {
        return this.parseValue(
            section,
            key,
            "JSON list",
            (v: string) => JSON.parse(v),
            defaultValue,
        );
    }

    /**
     * Section access
     */
    getSection(section: string): Section {
        return new Section(this, section);
    }

    // Private helper methods
    private processValue(value: any): string | undefined {
        if (
            value === null || typeof value === "boolean" ||
            Array.isArray(value) || typeof value === "object"
        ) {
            return JSON.stringify(value);
        }
        return String(value);
    }

    private stripValue(value: string): string {
        return value.trim();
    }

    private expandEnvVars(value: string): string {
        const env = Deno.env;
        return value.replace(
            /\$\{([^}]+)\}/g,
            (_, varName) => env.get(varName) || "",
        );
    }

    private parseBoolean(value: string): boolean {
        const lowered = value.toLowerCase();
        if (["true", "t", "yes", "y", "1"].includes(lowered)) return true;
        if (["false", "f", "no", "n", "0"].includes(lowered)) return false;
        throw new Error(`Invalid boolean value: ${value}`);
    }

    private getEnvVarName(section: string, key: string): string {
        return `MINIWDL__${section.toUpperCase()}__${key.toUpperCase()}`;
    }

    private isExcludedFromEnvExpansion(section: string, key: string): boolean {
        return section === "task_runtime" && key === "placeholder_regex";
    }

    private parseValue<T>(
        section: string,
        key: string,
        type: string,
        parser: (value: string) => T,
        defaultValue?: T,
    ): T {
        try {
            const value = this.get(section, key);
            return parser(value);
        } catch (error) {
            if (error instanceof ConfigMissing && defaultValue !== undefined) {
                return defaultValue;
            }
            this.logger.debug({
                msg: "failed to parse configuration option",
                section,
                key,
                value: this.get(section, key),
                expected_type: type,
            });
            throw new Error(
                `configuration option [${section}] ${key} should be ${type}`,
            );
        }
    }

    private readConfigFile(filename: string): ConfigParser {
        const content = readFileSync(filename);
        const config = new ConfigParser();
        config.read(content);
        return config;
    }

    private getXdgConfigDirs(): string[] {
        // TODO: Implement XDG config dirs detection
        return [];
    }

    private getXdgConfigHome(): string {
        // TODO: Implement XDG config home detection
        return path.join(Deno.cwd(), ".config");
    }
}
