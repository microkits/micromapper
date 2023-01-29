import { InputMapper } from "./InputMapper";

describe("InputMapper", () => {
  it("should return the same input passed to it", () => {
    const mapper = new InputMapper<string>();

    const input = "test input";
    const output = mapper.map(input);

    expect(output).toEqual(input);
  });
});