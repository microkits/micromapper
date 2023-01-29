import { AbstractMapper } from "./AbstractMapper";
import { ClassMapper } from "./ClassMapper";

describe("ClassMapper", () => {
  class TestClass {
    value: string;
    constructor(value: string) {
      this.value = value;
    }
  }

  it("should extend AbstractMapper", () => {
    expect(ClassMapper.prototype).toBeInstanceOf(AbstractMapper);
  });

  it("should map input to an instance of the specified class", () => {
    const mapper = new ClassMapper<string, typeof TestClass>(TestClass, {
      args: [{
        map: (input) => input
      }]
    });

    const output = mapper.map("test");

    expect(output).toBeInstanceOf(TestClass);
    expect(output.value).toEqual("test");
  });

  it("should map input to properties of the instance", () => {
    const mapper = new ClassMapper(TestClass, {
      args: [{
        map: (input: any) => input.value
      }],
      props: {
        value: {
          map: (input: any) => input.value + "_mapped"
        }
      }
    });

    const input = { value: "test" };
    const output = mapper.map(input);

    expect(output.value).toEqual("test_mapped");
  });

  it("should pass the input value to the constructor", () => {
    const mapper = new ClassMapper(TestClass, {
      args: [
        { map: (input: any) => input.value }
      ]
    });
    const input = { value: "test" };
    const output = mapper.map(input);
    expect(output.value).toEqual(input.value);
  });

  it("should handle missing options", () => {
    const mapper = new ClassMapper(TestClass);
    const input = { value: "test" };
    const output = mapper.map(input);
    expect(output).toBeInstanceOf(TestClass);
  });

  it('should return mapped class with props', () => {
    const mapper = new ClassMapper(TestClass)
      .props({
        value: {
          map: (input: number) => input.toString(),
        }
      });

    const result = mapper.map(123);
    expect(result).toBeInstanceOf(TestClass);
    expect(result.value).toBe("123");
  });

  it('should return mapped class with args', () => {
    const mapper = new ClassMapper(TestClass)
      .args([{
        map: (input: number) => input.toString(),
      }]);

    const result = mapper.map(456);
    expect(result).toBeInstanceOf(TestClass);
    expect(result.value).toBe("456");
  });

  it("should handle missing props", () => {
    const mapper = new ClassMapper(TestClass, {
      props: {}
    });

    const input = { value: "test" };
    const output = mapper.map(input);
    expect(output).toBeInstanceOf(TestClass);
  });

  it("should handle missing args", () => {
    const mapper = new ClassMapper(TestClass, {
      args: []
    });
    const input = { value: "test" };
    const output = mapper.map(input);
    expect(output).toBeInstanceOf(TestClass);
  });

  it("should handle missing options", () => {
    const mapper = new ClassMapper(TestClass);
    const input = { value: "test" };
    const output = mapper.map(input);
    expect(output).toBeInstanceOf(TestClass);
  });
});
