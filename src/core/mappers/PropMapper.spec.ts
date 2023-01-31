import { PropMapper } from "./PropMapper";

describe("PropMapper", () => {
  it("should map an input property to an output using the provided mapper", () => {
    const mapper = new PropMapper((input: number) => input, {
      map: (input: number) => input * 2
    });

    const input = 123;
    const output = mapper.map(input);

    expect(output).toEqual(246);
  });
})