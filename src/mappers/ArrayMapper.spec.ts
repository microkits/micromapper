import { ArrayMapper } from "./ArrayMapper";

describe("ArrayMapper", () => {
  describe("Deserialization", () => {
    it("must deserialize an array without errors", () => {
      const array = [1, 2, 3];
      const result = new ArrayMapper().deserialize(array);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expect(result).toBe(array);
    });

    it("must ignore value if not an array", () => {
      const result = new ArrayMapper().deserialize("not an array");
      expect(result).toBeUndefined();
    });
  });

  describe("Serialization", () => {
    it("must serialize an array without errors", () => {
      const array = Array.from([1, 2, 3]);
      const result = new ArrayMapper().serialize(array);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expect(result).toBe(array);
    });

    it("must serialize from a Iterable", () => {
      const set = new Set<string>()
        .add("testing A")
        .add("testing B")
        .add("testing C");

      const result = new ArrayMapper().serialize(set);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expect(result).toContain("testing A");
      expect(result).toContain("testing B");
      expect(result).toContain("testing C");
    });
  });
});