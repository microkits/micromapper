import { PrimitiveMapper } from "./PrimitiveMapper";

describe("PrimitiveMapper", () => {
  describe("Deserialization", () => {
    it("must deserialize a string", () => {
      const original = "testing";

      const result = new PrimitiveMapper()
        .deserialize(original, String);

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).toEqual(original);
    });

    it("must deserialize a number", () => {
      const original = 123;

      const result = new PrimitiveMapper()
        .deserialize(original, Number);

      expect(result).toBeDefined();
      expect(typeof result).toBe("number");
      expect(result).toEqual(original);
    });

    it("must deserialize 0 as a false boolean", () => {
      const original = 0;

      const result = new PrimitiveMapper()
        .deserialize(original, Boolean);

      expect(result).toBeDefined();
      expect(typeof result).toBe("boolean");
      expect(result).toEqual(false);
    });

    it("must deserialize 1 as a true boolean", () => {
      const original = 1;

      const result = new PrimitiveMapper()
        .deserialize(original, Boolean);

      expect(result).toBeDefined();
      expect(typeof result).toBe("boolean");
      expect(result).toEqual(true);
    });

    it("must deserialize a false boolean", () => {
      const original = false;

      const result = new PrimitiveMapper()
        .deserialize(original, Boolean);

      expect(result).toBeDefined();
      expect(typeof result).toBe("boolean");
      expect(result).toEqual(original);
    });

    it("must deserialize a true boolean", () => {
      const original = true;

      const result = new PrimitiveMapper()
        .deserialize(original, Boolean);

      expect(result).toBeDefined();
      expect(typeof result).toBe("boolean");
      expect(result).toEqual(original);
    });
  });

  describe("Serialization", () => {
    it("must serialize a string", () => {
      const original = String("testing");

      const result = new PrimitiveMapper()
        .serialize(original, String);

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).toEqual(original);
    });

    it("must serialize a number", () => {
      const original = Number(1234567890);

      const result = new PrimitiveMapper()
        .serialize(original, Number);

      expect(result).toBeDefined();
      expect(typeof result).toBe("number");
      expect(result).toEqual(original);
    });

    it("must serialize 0 as a false boolean", () => {
      const original = Boolean(0);

      const result = new PrimitiveMapper()
        .serialize(original, Boolean);

      expect(result).toBeDefined();
      expect(typeof result).toBe("boolean");
      expect(result).toEqual(false);
    });

    it("must serialize 1 as a true boolean", () => {
      const original = new Boolean(1);

      const result = new PrimitiveMapper()
        .serialize(original, Boolean);

      expect(result).toBeDefined();
      expect(typeof result).toBe("boolean");
      expect(result).toEqual(true);
    });

    it("must serialize a false boolean", () => {
      const original = false;

      const result = new PrimitiveMapper()
        .serialize(original, Boolean);

      expect(result).toBeDefined();
      expect(typeof result).toBe("boolean");
      expect(result).toEqual(original);
    });

    it("must serialize a true boolean", () => {
      const original = true;

      const result = new PrimitiveMapper()
        .serialize(original, Boolean);

      expect(result).toBeDefined();
      expect(typeof result).toBe("boolean");
      expect(result).toEqual(original);
    });
  });
});