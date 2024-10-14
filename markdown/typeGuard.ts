export function isNonNullish<T>(value: T | null | undefined): value is T {
  return !(value === undefined || value === null);
}

export function assertNonNullish<T>(
  value: T | null | undefined
): asserts value is T {
  if (value === undefined || value === null) {
    throw new TypeError("value must be non-nullish.");
  }
}

export function castNonNullish<T>(value: T | null | undefined): T {
  if (value === undefined || value === null) {
    throw new TypeError("value must be non-nullish.");
  }
  return value;
}

export function filterNonNullish<T>(v: (T | null | undefined)[]): T[] {
  return v.filter((e) => e != null) as T[];
}

export function assertTruthy(value: unknown): asserts value {
  if (!value) {
    throw new TypeError("value must be true.");
  }
}

export function unsafeAssertType<T>(_value: unknown): asserts _value is T {
  return;
}

// 测试工具 [vitest](https://cn.vitest.dev/guide/)
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("isNonNullish", () => {
    expect(isNonNullish("")).toBe(true);
    expect(isNonNullish(null)).toBe(false);
    expect(isNonNullish(undefined)).toBe(false);
  });

  it("assertNonNullish", () => {
    expect(() => {
      assertNonNullish("");
    }).not.toThrowError();
    expect(() => {
      assertNonNullish(null);
    }).toThrowError();
    expect(() => {
      assertNonNullish(undefined);
    }).toThrowError();
  });

  it("castNonNullish", () => {
    expect(castNonNullish("")).toBe("");
    expect(() => castNonNullish<unknown>(null)).toThrowError();
    expect(() => castNonNullish<unknown>(undefined)).toThrowError();
  });
}
