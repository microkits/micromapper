import { ValueMapper } from "./ValueMapper";

describe("ValueMapper", () => {
  it("should return mapped string", () => {
    const mapper = new ValueMapper((input: number) => (
      input.toString())
    );

    expect(mapper.map(123)).toBe("123");
  });

  it("should return mapped number", () => {
    const mapper = new ValueMapper((input: string) => (
      Number(input)
    ));

    expect(mapper.map("456")).toBe(456);
  });

  it("should return mapped symbol", () => {
    const mapper = new ValueMapper((input: string) => (
      Symbol.for(input))
    );

    expect(mapper.map("symbol")).toBe(Symbol.for("symbol"));
  });

  it("should return mapped boolean", () => {
    const mapper = new ValueMapper((input: number) => (
      input > 0)
    );

    expect(mapper.map(1)).toBe(true);
  });

  it("should return mapped bigint", () => {
    const mapper = new ValueMapper((input: number) => (
      BigInt(input)
    ));

    expect(mapper.map(789)).toBe(BigInt(789));
  });

  it("should return a mapped Date", () => {
    const mapper = new ValueMapper((input: string) => (
      new Date(input))
    );

    expect(mapper.map("2022-01-01")).toEqual(new Date("2022-01-01"));
  });

  it("should return undefined for invalid input", () => {
    const mapper = new ValueMapper((input) => input?.toString());

    expect(mapper.map(null)).toBe(undefined);
    expect(mapper.map(undefined)).toBe(undefined);
  });

  it("should return mapped object", () => {
    const mapper = new ValueMapper((input) => ({ value: input }));

    expect(mapper.map("test")).toEqual({ value: "test" });
  });

  it("should return mapped array", () => {
    const mapper = new ValueMapper((input) => [input]);

    expect(mapper.map(1)).toEqual([1]);
  });
});