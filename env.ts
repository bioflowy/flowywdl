/**
 * Environments, for identifier resolution during WDL typechecking and evaluation.
 */


export class Binding<T> {
  private _name: string;
  private _value: T;
  private _info: any;

  constructor(name: string, value: T, info: any = null) {
    this._name = name;
    this._value = value;
    this._info = info;
  }

  /**
   * Namespaced names are flat, dot-separated strings.
   */
  get name(): string {
    return this._name;
  }

  get value(): T {
    return this._value;
  }

  get info(): any {
    return this._info;
  }
}

export class Bindings<T> implements Iterable<Binding<T>> {
  private _binding: Binding<T> | null;
  private _next: Bindings<T> | null;
  private _namespaces: Set<string> | null = null;

  constructor(
    binding: Binding<T> | null = null,
    next: Bindings<T> | null = null,
  ) {
    if (!binding && next) {
      throw new Error(
        "Invalid Bindings construction: binding must exist if next exists",
      );
    }
    this._binding = binding;
    this._next = next;
  }
  get length(){
    let next = this._next
    let i=0
    for(;next!==null;next=next._next){
      i++;
    }
    return i;
  }
  *[Symbol.iterator](): Iterator<Binding<T>> {
    const mask = new Set<string>();
    let pos: Bindings<T> | null = this;

    while (pos !== null) {
      if (pos._binding && !mask.has(pos._binding.name)) {
        mask.add(pos._binding.name);
        yield pos._binding;
      }
      pos = pos._next;
    }
  }
  bind(name: string, value: T, info: any = null): Bindings<T> {
    if (!name || name.startsWith(".") || name.endsWith(".")) {
      throw new Error("Invalid binding name");
    }
    return new Bindings(new Binding(name, value, info), this);
  }

  resolveBinding(name: string): Binding<T> {
    for (const b of this) {
      if (b.name === name) {
        return b;
      }
    }
    throw new Error(`Binding not found: ${name}`);
  }

  resolve(name: string): T {
    return this.resolveBinding(name).value;
  }

  get(name: string, defaultValue: T | null = null): T | null {
    try {
      return this.resolve(name);
    } catch {
      return defaultValue;
    }
  }

  hasBinding(name: string): boolean {
    try {
      this.resolve(name);
      return true;
    } catch {
      return false;
    }
  }
  mapToArray<S>(f: (b: Binding<T>) => S | null): S[] {
    const ans = []
    for (const b of this) {
      const fb = f(b);
      if (fb) {
        ans.push(fb)
      }
    }
    return ans;
  }

  map<S>(f: (b: Binding<T>) => Binding<S> | null): Bindings<S> {
    let ans = new Bindings<S>();
    for (const b of this) {
      const fb = f(b);
      if (fb) {
        ans = new Bindings(fb, ans);
      }
    }
    return reverse(ans);
  }
  async mapAwait<S>(f: (b: Binding<T>) => Promise<Binding<S>> | null): Promise<Bindings<S>> {
    let ans = new Bindings<S>();
    for (const b of this) {
      const fb = f(b);
      if (fb) {
        const fb2 = await fb;
        ans = new Bindings(fb2, ans);
      }
    }
    return reverse(ans);
  }

  filter(pred: (b: Binding<T>) => boolean): Bindings<T> {
    return this.map((b) => pred(b) ? b : null);
  }

  subtract<S>(rhs: Bindings<S>): Bindings<T> {
    return this.filter((b) => {
      try {
        rhs.resolve(b.name);
        return false;
      } catch {
        return true;
      }
    });
  }

  get namespaces(): Set<string> {
    if (this._namespaces === null) {
      this._namespaces = this._next
        ? new Set(this._next.namespaces)
        : new Set();

      if (this._binding) {
        const names = this._binding.name.split(".");
        if (names.length > 1) {
          for (let i = 0; i < names.length - 1; i++) {
            const ns = names.slice(0, i + 1).join(".") + ".";
            this._namespaces.add(ns);
          }
        }
      }
    }
    return new Set(this._namespaces);
  }

  hasNamespace(namespace: string): boolean {
    if (!namespace.endsWith(".")) {
      namespace += ".";
    }
    return this.namespaces.has(namespace);
  }

  enterNamespace(namespace: string): Bindings<T> {
    if (!namespace.endsWith(".")) {
      namespace += ".";
    }

    return this.map((b) => {
      if (b.name.startsWith(namespace)) {
        return new Binding(
          b.name.slice(namespace.length),
          b.value,
          b.info,
        );
      }
      return null;
    });
  }

  wrapNamespace(namespace: string): Bindings<T> {
    if (!namespace.endsWith(".")) {
      namespace += ".";
    }
    let ans = new Bindings<T>();
    for (const b of this) {
      ans = new Bindings(
        new Binding(namespace + b.name, b.value, b.info),
        ans,
      );
    }
    return reverse(ans);
  }
}

function reverse<T>(env: Bindings<T>): Bindings<T> {
  let ans = new Bindings<T>();
  for (const b of env) {
    ans = new Bindings(b, ans);
  }
  return ans;
}

export function merge<T>(...args: Bindings<T>[]): Bindings<T> {
  if (args.length === 0) {
    return new Bindings();
  }

  let ans = args[args.length - 1];
  for (let i = args.length - 2; i >= 0; i--) {
    const env = args[i];
    for (const b of reverse(env)) {
      ans = new Bindings(b, ans);
    }
  }
  return ans;
}
