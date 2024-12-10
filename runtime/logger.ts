// logger.ts
import {type Logger as StdLogger, setup, ConsoleHandler,formatters,getLogger } from "https://deno.land/std/log/mod.ts";

setup({
  handlers: {
    default: new ConsoleHandler("DEBUG", {
      useColors: true,
      formatter: (record) => {
        let output = `${record.datetime} ${record.levelName} ${record.msg}`;
        
        // エラーオブジェクトが存在する場合はスタックトレースを追加
        if (record.args.length > 0 && record.args[0] instanceof Error) {
          const error = record.args[0];
          output += `\nError: ${error.message}\nStack trace:\n${error.stack}`;
        }
        
        return output;
      },
    }),
  },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["default"],
    },
  },
});

export type Logger = StdLogger;
export const logger = getLogger()
