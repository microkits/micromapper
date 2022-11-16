import { MicroMapper } from "./MicroMapper";
import { Schema } from "./MicroMapper.types";

describe("MicroMapper", () => {
  describe("Deserialization", () => {
    it("must deserialize a schema", () => {
      const mapper = new MicroMapper();

      class A {
        readonly a: string;
        readonly b: string;
        readonly c: number;
      };

      const schema: Schema = {
        class: A,
        props: {
          a: String,
          b: String,
          c: Number
        }
      };

      const original = {
        a: "abc",
        b: "cde",
        c: 123
      }

      const deserialized = mapper.deserialize(original, schema);

      expect(deserialized).toBeDefined();
      expect(deserialized).toBeInstanceOf(A);
      expect(deserialized).toHaveProperty("a", original.a);
      expect(deserialized).toHaveProperty("b", original.b);
      expect(deserialized).toHaveProperty("c", original.c);
    });

    it("must deserialize a multidimensional array", () => {
      const mapper = new MicroMapper();

      const original = [[1, 2, 3], [4, 5, 6]];

      const serialized = mapper.deserialize(original, [[Number]]);

      expect(serialized).toBeDefined();
      expect(serialized).toHaveLength(2);
      expect(serialized[0]).toEqual(original[0]);
      expect(serialized[1]).toEqual(original[1]);
    });

    it("must deserialize a schema array", () => {
      const mapper = new MicroMapper();

      class A {
        readonly a: string;
        readonly b: string;
        readonly c: number;
      };

      const schema: Schema = {
        class: A,
        props: {
          a: String,
          b: String,
          c: Number
        }
      };

      const original = {
        a: "abc",
        b: "cde",
        c: 123
      }

      const deserialized = mapper.deserialize([original], [schema]);

      expect(deserialized).toBeDefined();
      expect(deserialized).toHaveLength(1);
      expect(deserialized[0]).toBeInstanceOf(A);
      expect(deserialized[0]).toHaveProperty("a", original.a);
      expect(deserialized[0]).toHaveProperty("b", original.b);
      expect(deserialized[0]).toHaveProperty("c", original.c);
    });

    it("must throws an error when a schema array is used to deserialize a non-array value", () => {
      const mapper = new MicroMapper();

      class A {
        readonly a: string;
        readonly b: string;
        readonly c: number;
      };

      const schema: Schema = {
        class: A,
        props: {
          a: String,
          b: String,
          c: Number
        }
      };

      const original = {
        a: "abc",
        b: "cde",
        c: 123
      }

      expect(() => {
        mapper.deserialize(original, [schema]);
      }).toThrow();
    })

    it("must deserialize with a custom deserializer", () => {
      const fn = jest.fn().mockImplementation((value) => {
        return new A(value.a, value.b, value.c);
      });

      class A {
        constructor(
          readonly a: string,
          readonly b: string,
          readonly c: number
        ) { }
      };

      const mapper = new MicroMapper();

      mapper.addMapper(A, {
        deserialize: fn,
        serialize: null,
      });

      const original = {
        a: "abc",
        b: "cde",
        c: 123
      }

      const deserialized = mapper.deserializeType(original, A);

      expect(fn).toBeCalledWith(original, A);
      expect(deserialized).toBeDefined();
      expect(deserialized).toBeInstanceOf(A);
      expect(deserialized).toHaveProperty("a", original.a);
      expect(deserialized).toHaveProperty("b", original.b);
      expect(deserialized).toHaveProperty("c", original.c);
    });

    it("should throw an error when there is no deserializer registered for a type", () => {
      class A { };

      const mapper = new MicroMapper();

      expect(() => {
        mapper.deserialize({}, A)
      }).toThrow();
    });

  });

  describe("Serialization", () => {
    it("must serialize a schema", () => {

      class A {
        constructor(
          readonly a: string,
          readonly b: string,
          readonly c: number
        ) { }
      };

      const schema: Schema = {
        class: A,
        props: {
          a: String,
          b: String,
          c: Number
        }
      };

      const original = new A("abc", "cde", 123);

      const mapper = new MicroMapper();

      const serialized = mapper.serialize(original, schema);

      expect(serialized).toBeDefined();
      expect(serialized).not.toBeInstanceOf(A);
      expect(serialized).toHaveProperty("a", original.a);
      expect(serialized).toHaveProperty("b", original.b);
      expect(serialized).toHaveProperty("c", original.c);
    });

    it("must serialize a multidimensional array", () => {
      const mapper = new MicroMapper();

      const original = [[1, 2, 3], [4, 5, 6]];

      const serialized = mapper.serialize(original, [[Number]]);

      expect(serialized).toBeDefined();
      expect(serialized).toHaveLength(2);
      expect(serialized[0]).toEqual(original[0]);
      expect(serialized[1]).toEqual(original[1]);
    });

    it("must deserialize a schema array", () => {
      class A {
        constructor(
          readonly a: string,
          readonly b: string,
          readonly c: number
        ) { }
      };

      const schema: Schema = {
        class: A,
        props: {
          a: String,
          b: String,
          c: Number
        }
      };

      const original = new A("abc", "cde", 123);

      const mapper = new MicroMapper();

      const serialized = mapper.serialize([original], [schema]);

      expect(serialized).toBeDefined();
      expect(serialized).toHaveLength(1);
      expect(serialized[0]).not.toBeInstanceOf(A);
      expect(serialized[0]).toHaveProperty("a", original.a);
      expect(serialized[0]).toHaveProperty("b", original.b);
      expect(serialized[0]).toHaveProperty("c", original.c);
    });

    it("must throws an error when a schema array is used to serialize a non-array value", () => {
      const mapper = new MicroMapper();

      class A { };

      const schema: Schema = {
        class: A,
        props: {}
      };

      expect(() => {
        mapper.serialize(new A(), [schema]);
      }).toThrow();
    })

    it("should throw an error when there is no serializer registered for a type", () => {
      class A { };

      const mapper = new MicroMapper();

      expect(() => {
        mapper.serialize(new A(), A)
      }).toThrow();
    });

  });
});