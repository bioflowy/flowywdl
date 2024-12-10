import type { Token } from "typescript-parsec";
import * as WDLError from "../error.ts"

export function toSourcePos(token:Token<unknown>):WDLError.SourcePosition{
    const p = token.pos;
    return {
        uri: "",
        abspath: "",
        line: p.rowBegin,
        column: p.columnBegin,
        end_line: p.rowEnd,
        end_column: p.columnEnd
    }
};
