import { logger } from "./logger.ts";

/**
 * Python の ConfigParser に似た設定パーサー
 */
export class ConfigParser {
    private _sections: Map<string, Map<string, string>>;
  
    constructor() {
      this._sections = new Map();
    }
  
    /**
     * 設定ファイルを読み込む
     */
    read(content: string): void {
      let currentSection = 'DEFAULT';
      let currentSectionMap: Map<string, string> = new Map();
      this._sections.set(currentSection,currentSectionMap);
      let currentKey: string | null = null;
      let currentValue: string[] = [];
      const lines = content.split('\n');
      function isValueContinuation(line: string): boolean {
        return line.startsWith(' ') || line.startsWith('\t');
      }
      for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trimEnd();
          
          // 空行やコメントをスキップ
          if (line === '' || line.startsWith(';') || line.startsWith('#')) {
              // 値の蓄積中なら値確定
              if (currentKey && currentValue.length > 0) {
                  currentSectionMap.set(currentKey, currentValue.join('\n'));
                  currentKey = null;
                  currentValue = [];
              }
              continue;
          }
          
          // セクションの処理 [section]
          if (line.startsWith('[') && line.endsWith(']')) {
              // 前の値があれば確定
              if (currentKey && currentValue.length > 0) {
                  currentSectionMap.set(currentKey,currentValue.join('\n'))
                  currentKey = null;
                  currentValue = [];
              }
              
              currentSection = line.slice(1, -1).trim();
              currentSectionMap = this._sections.get(currentSection) || new Map();
              this._sections.set(currentSection,currentSectionMap);
              continue;
          }
          
          // 継続行の処理
          if (isValueContinuation(line) && currentKey) {
              currentValue.push(line.trim());
              continue;
          }
          
          // バックスラッシュによる継続行の処理
          if (line.endsWith('\\')) {
              if (!currentKey) {
                  // キー・バリューペアの開始
                  const separatorIndex = line.slice(0, -1).indexOf('=');
                  if (separatorIndex !== -1) {
                      // 前の値があれば確定
                      if (currentKey && currentValue.length > 0) {
                        currentSectionMap.set(currentKey, currentValue.join('\n'));
                      }
                      currentKey = line.slice(0, separatorIndex).trim();
                      currentValue = [line.slice(separatorIndex + 1, -1).trim()];
                  }
              } else {
                  // 継続行の追加
                  currentValue.push(line.slice(0, -1).trim());
              }
              continue;
          }
          
          // 通常のキー・バリューペアの処理
          const separatorIndex = line.indexOf('=');
          if (separatorIndex !== -1) {
              // 前の値があれば確定
              if (currentKey && currentValue.length > 0) {
                  currentSectionMap.set(currentKey, currentValue.join('\n'));
              }
              
              currentKey = line.slice(0, separatorIndex).trim();
              currentValue = [line.slice(separatorIndex + 1).trim()];
              
              // 単一行の場合はすぐに確定
              if (!lines[i + 1] || !isValueContinuation(lines[i + 1])) {
                  currentSectionMap.set(currentKey, currentValue.join('\n'));
                  currentKey = null;
                  currentValue = [];
              }
          }
      }
      
      // set final value
      if (currentKey && currentValue.length > 0) {
        currentSectionMap.set(currentKey, currentValue.join('\n'));
      }
  }
  
    /**
     * セクションの存在確認
     */
    hasSection(section: string): boolean {
      return this._sections.has(section);
    }
  
    /**
     * セクション内のオプションの存在確認
     */
    hasOption(section: string, option: string): boolean {
      const sect = this._sections.get(section);
      return sect ? sect.has(option) : false;
    }
  
    /**
     * 値の取得
     */
    get(section: string, option: string, fallback?: string): string {
      const sect = this._sections.get(section);
      if (sect === undefined) {
        if (fallback !== undefined) return fallback;
        throw new Error(`Section ${section} not found`);
      }
      
      const value = sect.get(option);
      if (value === undefined) {
        if (fallback !== undefined) return fallback;
        throw new Error(`Option ${option} not found in section ${section}`);
      }
      
      return value;
    }
    /**
     * set value
     */
    set(section: string, option: string,value: string) {
        const sect = this._sections.get(section);
        if (!sect) {
          throw new Error(`Section ${section} not found`);
        }
        sect.set(option,value);
      }
      addSection(section:string){
        this._sections.set(section,new Map<string,string>())
    }
    /**
     * 数値として値を取得
     */
    getNumber(section: string, option: string, fallback?: number): number {
      const value = fallback !== undefined ? 
        this.get(section, option, String(fallback)) :
        this.get(section, option);
      const num = Number(value);
      if (isNaN(num)) {
        throw new Error(`Option ${option} in section ${section} is not a number`);
      }
      return num;
    }
  
    /**
     * 真偽値として値を取得
     */
    getBoolean(section: string, option: string, fallback?: boolean): boolean {
      const value = fallback !== undefined ?
        this.get(section, option, String(fallback)) :
        this.get(section, option);
      return ['true', 'yes', '1', 'on'].includes(value.toLowerCase());
    }
  
    /**
     * セクション一覧の取得
     */
    sections(): string[] {
      return Array.from(this._sections.keys());
    }
    /**
     * セクション内のオプション一覧の取得
     */
    options(section: string): string[] {
      const sect = this._sections.get(section);
      return sect ? Array.from(sect.keys()) : [];
    }
    hasSecction(section: string):boolean{
        return this._sections.has(section);
    }
    /**
     * 設定の書き出し
     */
    write(filename: string): void {
      let content = '';
      for (const [section, options] of this._sections) {
        content += `[${section}]\n`;
        for (const [key, value] of options) {
          content += `${key} = ${value}\n`;
        }
        content += '\n';
      }
      Deno.writeTextFileSync(filename, content);
    }
  }
  