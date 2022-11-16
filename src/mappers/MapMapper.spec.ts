import { MapMapper } from "./MapMapper";

describe("MapMapper", () => {
  describe("Deserialization", () => {
    it("must create a Map from a object", () => {
      const original = { a: 123, b: 123, c: 456 };

      const result = new MapMapper().deserialize(original);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Map);
      expect(result.get("a")).toBe(original.a);
      expect(result.get("b")).toBe(original.b);
      expect(result.get("c")).toBe(original.c);
    });
  });

  describe("Serialization", () => {
    it("must serialize a Map", () => {
      const original = new Map(
        Object.entries({
          a: 123,
          b: 456
        })
      );
      const result = new MapMapper().serialize(original);

      expect(result).toBeDefined();
      expect(result).toHaveProperty("a", 123);
      expect(result).toHaveProperty("b", 456);
    });
  })
});