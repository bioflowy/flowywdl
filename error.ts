import { Base, Float, Int } from "./type.ts";

export interface SourcePosition {
    uri: string;
    abspath: string;
    line: number;
    column: number;
    end_line: number;
    end_column: number;
}
export class BadCharacterEncoding extends Error {
    pos: SourcePosition;

    constructor(pos: SourcePosition){
        super(`Bad character encoding at ${pos.uri}:${pos.line}:${pos.column}`);
        this.pos = pos
    }
}

export class SyntaxError extends Error {
    pos: SourcePosition;
    wdl_version: string;
    declared_wdl_version: string | null;

    constructor(pos: SourcePosition, message: string, wdl_version: string, declared_wdl_version: string | null) {
        super(message);
        this.pos = pos;
        this.wdl_version = wdl_version;
        this.declared_wdl_version = declared_wdl_version;
    }
}

export class ImportError extends Error {
    pos: SourcePosition;

    constructor(pos: SourcePosition, importUri: string, message?: string) {
        super(`Failed to import ${importUri}${message ? `, ${message}` : ''}`);
        this.pos = pos;
    }
}

export abstract class SourceNode {
    pos: SourcePosition;
    parent: SourceNode | null = null;

    constructor(pos: SourcePosition) {
        this.pos = pos;
    }

    compareTo(rhs: SourceNode): number {
        const compare = (a: SourcePosition, b: SourcePosition): number =>
            a.abspath.localeCompare(b.abspath) ||
            a.line - b.line ||
            a.column - b.column ||
            a.end_line - b.end_line ||
            a.end_column - b.end_column;

        return rhs instanceof SourceNode ? compare(this.pos, rhs.pos) : 0;
    }

    equals(rhs: SourceNode): boolean {
        return rhs instanceof SourceNode && this.pos === rhs.pos;
    }

    get children(): Iterable<SourceNode> {
        return [];
    }
}

export abstract class ValidationError extends Error {
    pos: SourcePosition;
    node: SourceNode | null = null;
    sourceText: string | null = null;
    declaredWdlVersion: string | null = null;

    constructor(node: SourceNode | SourcePosition, message: string) {
        super(message);
        if (node instanceof SourceNode) {
            this.node = node;
            this.pos = node.pos;
        } else {
            this.pos = node;
        }
    }
}

export class InvalidType extends ValidationError {}
export class IndeterminateType extends ValidationError {}

export class NoSuchTask extends ValidationError {
    constructor(node: SourceNode | SourcePosition, name: string) {
        super(node, `No such task/workflow: ${name}`);
    }
}

export class NoSuchCall extends ValidationError {
    constructor(node: SourceNode | SourcePosition, name: string) {
        super(node, `No such call in this workflow: ${name}`);
    }
}

export class NoSuchFunction extends ValidationError {
    constructor(node: SourceNode | SourcePosition, name: string) {
        super(node, `No such function: ${name}`);
    }
}

export class WrongArity extends ValidationError {
    constructor(node: SourceNode | SourcePosition, expected: number) {
        super(node, `${(node as any).functionName} expects ${expected} argument(s)`);
    }
}

export class NotAnArray extends ValidationError {
    constructor(node: SourceNode | SourcePosition) {
        super(node, 'Not an array');
    }
}

export class NoSuchMember extends ValidationError {
    constructor(node: SourceNode | SourcePosition, member: string) {
        super(node, `No such member '${member}'`);
    }
}

export class StaticTypeMismatch extends ValidationError {
    expected: Base;
    actual: Base;
    override message: string;

    constructor(node: SourceNode, expected: Base, actual: Base, message = '') {
        super(node, message);
        this.expected = expected;
        this.actual = actual;
        this.message = message;
    }

    override toString(): string {
        let msg = `Expected ${this.expected} instead of ${this.actual}`;
        if (this.message) {
            msg += `; ${this.message}`;
        } else if (this.expected instanceof Int && this.actual instanceof Float) {
            msg += '; perhaps try floor() or round()';
        }
        return msg;
    }
}

export class IncompatibleOperand extends ValidationError {
    constructor(node: SourceNode, message: string) {
        super(node, message);
    }
}

export class UnknownIdentifier extends ValidationError {
    constructor(node: SourceNode, message?: string) {
        super(node, message || `Unknown identifier ${node}`);
    }
}

export class NoSuchInput extends ValidationError {
    constructor(node: SourceNode, name: string) {
        super(node, `No such input ${name}`);
    }
}

export class UncallableWorkflow extends ValidationError {
    constructor(node: SourceNode, name: string) {
        super(node, `Cannot call subworkflow ${name} due to missing inputs or lacking an output section`);
    }
}

export class MultipleDefinitions extends ValidationError {}
export class StrayInputDeclaration extends ValidationError {}

export class CircularDependencies extends ValidationError {
    constructor(node: SourceNode) {
        const name = (node as any).name || (node as any).workflowNodeId;
        super(node, `circular dependencies involving ${name || 'unknown entity'}`);
    }
}

export class MultipleValidationErrors extends Error {
    exceptions: ValidationError[];
    sourceText: string | null = null;
    declaredWdlVersion: string | null = null;

    constructor(...exceptions: (ValidationError | MultipleValidationErrors)[]) {
        super();
        this.exceptions = [];
        for (const ex of exceptions) {
            if (ex instanceof ValidationError) {
                this.exceptions.push(ex);
            } else if (ex instanceof MultipleValidationErrors) {
                this.exceptions.push(...ex.exceptions);
            } else {
                throw new Error('Invalid exception type');
            }
        }
        this.exceptions.sort((a, b) => a.pos.line - b.pos.line);
    }
}

class MultiContext {
    private exceptions: (ValidationError | MultipleValidationErrors)[] = [];

    try1(fn: () => any): any | null {
        try {
            return fn();
        } catch (ex) {
            if (ex instanceof ValidationError || ex instanceof MultipleValidationErrors) {
                this.exceptions.push(ex);
                return null;
            } else {
                throw ex;
            }
        }
    }

    append(ex: ValidationError | MultipleValidationErrors): void {
        this.exceptions.push(ex);
    }

    maybeRaise(): void {
        if (this.exceptions.length === 1) throw this.exceptions[0];
        if (this.exceptions.length > 0) throw new MultipleValidationErrors(...this.exceptions);
    }
}

export async function multiContext(fn: (ctx: MultiContext) => any): Promise<void> {
    const ctx = new MultiContext();
    await fn(ctx);
    ctx.maybeRaise();
}

export class RuntimeError extends Error {
    moreInfo: { [key: string]: any };

    constructor(message: string, moreInfo: { [key: string]: any } = {}) {
        super(message);
        this.moreInfo = moreInfo;
    }
}

export class EvalError extends RuntimeError {
    pos: SourcePosition;
    node: SourceNode | null = null;

    constructor(node: SourceNode | SourcePosition, message: string) {
        super(message);
        this.pos = node instanceof SourceNode ? node.pos : node;
        this.node = node instanceof SourceNode ? node : null;
    }
}

export class OutOfBounds extends EvalError {}

export class EmptyArray extends EvalError {
    constructor(node: SourceNode) {
        super(node, 'Empty array for Array+ input/declaration');
    }
}

export class NullValue extends EvalError {
    constructor(node: SourceNode | SourcePosition) {
        super(node, 'Null value');
    }
}

export class InputError extends RuntimeError {}
