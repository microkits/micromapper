import { EachMapper } from "./EachMapper";

describe("EachMapper", () => {
  it("should map an input array to an output array using the provided mapper", () => {
    const mapper = new EachMapper((input: number[]) => input, {
      map: (input: number) => input * 2
    });

    const input = [1, 2, 3];
    const output = mapper.map(input);

    expect(output).toEqual([2, 4, 6]);
  });
})