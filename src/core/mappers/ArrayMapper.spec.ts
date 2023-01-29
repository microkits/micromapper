import { ArrayMapper } from "./ArrayMapper";

describe("ArrayMapper", () => {
  it("should map a to an array", () => {
    const mapper = new ArrayMapper<number, number>(input => [input * 2, input * 3]);
    const result = mapper.map(2);
    expect(result).toEqual([4, 6]);
  });

  it("should return an empty array if input is undefined", () => {
    const mapper = new ArrayMapper<number, number>(input => [input * 2, input * 3]);
    const result = mapper.map(undefined);
    expect(result).toEqual(undefined);
  });
})