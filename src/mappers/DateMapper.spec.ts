import { DateMapper } from "./DateMapper";

describe("DateMapper", () => {
  describe("Deserialization", () => {
    it("must deserialize from a ISO string", () => {
      const date = new Date();
      const result = new DateMapper().deserialize(date.toISOString());

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toEqual(date.getTime());
    });

    it("must deserialize from a timestamp", () => {
      const date = Date.now();
      const result = new DateMapper().deserialize(date);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBe(date);
    });
  });
  describe("Serialization", () => {
    it("must serialize to a ISO string", () => {
      const date = new Date();
      const result = new DateMapper().serialize(date);

      expect(result).toBeDefined();
      expect(result).toBe(date.toISOString());
    });
  });
});