import { MapperBuilder } from "./MapperBuilder";
import { AbstractMapper } from "./mappers/AbstractMapper";
import { ArrayMapper } from "./mappers/ArrayMapper";
import { ClassMapper } from "./mappers/ClassMapper";
import { EachMapper } from "./mappers/EachMapper";
import { InputMapper } from "./mappers/InputMapper";
import { ObjectMapper } from "./mappers/ObjectMapper";
import { PropMapper } from "./mappers/PropMapper";
import { ValueMapper } from "./mappers/ValueMapper";

describe("MapperBuilder", () => {
  describe("MapperBuilder.class", () => {
    it("should return a ClassMapper object", () => {
      const builder = new MapperBuilder()
      const mapper = builder.class(null);
      expect(mapper).toBeInstanceOf(ClassMapper);
    });
  });

  describe("MapperBuilder.array", () => {
    it("should return a ArrayMapper object", () => {
      const builder = new MapperBuilder()
      const mapper = builder.array(null);
      expect(mapper).toBeInstanceOf(ArrayMapper);
    });
  });

  describe("MapperBuilder.object", () => {
    it("should return a ObjectMapper object", () => {
      const builder = new MapperBuilder()
      const mapper = builder.object(null);
      expect(mapper).toBeInstanceOf(ObjectMapper);
    });
  });

  describe("MapperBuilder.string", () => {
    it("should return a ValueMapper object", () => {
      const builder = new MapperBuilder()
      const mapper = builder.string(null);
      expect(mapper).toBeInstanceOf(ValueMapper);
    });
  });

  describe("MapperBuilder.date", () => {
    it("should return a ValueMapper object", () => {
      const builder = new MapperBuilder()
      const mapper = builder.date(null);
      expect(mapper).toBeInstanceOf(ValueMapper);
    });
  });

  describe("MapperBuilder.bigint", () => {
    it("should return a ValueMapper object", () => {
      const builder = new MapperBuilder()
      const mapper = builder.bigint(null);
      expect(mapper).toBeInstanceOf(ValueMapper);
    });
  });

  describe("MapperBuilder.each", () => {
    it("should create a EachMapper with the given selector and mapper", () => {
      const builder = new MapperBuilder()
      const mapper = builder.each(null, null);
      expect(mapper).toBeInstanceOf(EachMapper);
    });

    it("should create a EachMapper with the given selector and mapper factory", () => {
      const builder = new MapperBuilder()
      const mapper = builder.each(null, (builder) => (
        builder.input()
      ));
      expect(mapper).toBeInstanceOf(EachMapper);
    })
  });

  describe("MapperBuilder.prop", () => {
    it("should create a PropMapper with the given selector and mapper", () => {
      const builder = new MapperBuilder()
      const mapper = builder.prop(null, null);
      expect(mapper).toBeInstanceOf(PropMapper);
    });

    it("should create a PropMapper with the given selector and mapper factory", () => {
      const builder = new MapperBuilder()
      const mapper = builder.prop(null, (builder) => (
        builder.input()
      ));
      expect(mapper).toBeInstanceOf(PropMapper);
    })
  });

  describe("MapperBuilder.symbol", () => {
    it("should return a ValueMapper object", () => {
      const builder = new MapperBuilder()
      const mapper = builder.symbol(null);
      expect(mapper).toBeInstanceOf(ValueMapper);
    });
  });

  describe("MapperBuilder.number", () => {
    it("should return a ValueMapper object", () => {
      const builder = new MapperBuilder()
      const mapper = builder.number(null);
      expect(mapper).toBeInstanceOf(ValueMapper);
    });
  });

  describe("MapperBuilder.boolean", () => {
    it("should return a ValueMapper object", () => {
      const builder = new MapperBuilder()
      const mapper = builder.boolean(null);
      expect(mapper).toBeInstanceOf(ValueMapper);
    });
  });

  describe("MapperBuilder.input", () => {
    test("should return an InputMapper", () => {
      const mapper = new MapperBuilder().input();

      expect(mapper).toBeInstanceOf(InputMapper);
    });
  });

  describe("MapperBuilder.mapper", () => {
    it("should return a ValueMapper object", () => {
      const builder = new MapperBuilder()
      const mapper = builder.mapper(null);
      expect(mapper).toBeInstanceOf(AbstractMapper);
    });
  });

  describe("MapperBuilder.value", () => {
    it("should return a ValueMapper object", () => {
      const builder = new MapperBuilder()
      const mapper = builder.value(null);
      expect(mapper).toBeInstanceOf(ValueMapper);
    });
  });
});