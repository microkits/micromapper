import { Constructor, JSONValue, Options, Schema } from "./MicroMapper.types";
import { Mapper } from "./mappers/Mapper";
import { PrimitiveMapper } from "./mappers/PrimitiveMapper";
import { DateMapper } from "./mappers/DateMapper";
import { ArrayMapper } from "./mappers/ArrayMapper";
import { MapMapper } from "./mappers/MapMapper";

export class MicroMapper {
  private readonly mappers: Map<Constructor, Mapper>;

  constructor() {
    this.mappers = new Map();

    this.addMapper(String, new PrimitiveMapper());
    this.addMapper(Number, new PrimitiveMapper());
    this.addMapper(Boolean, new PrimitiveMapper());
    this.addMapper(Date, new DateMapper());
    this.addMapper(Array, new ArrayMapper());
    this.addMapper(Map, new MapMapper());
  }

  /**
   * Add a mapper for the given type.
   * 
   * @param {T} type - The class you want to bind serialize/deserializer.
   * @param mapper - The mapper that will be used to serialize/deserialize the object.
   * @returns The MicroMapper itself.
   */
  addMapper<T extends Constructor>(type: T, mapper: Mapper<T>): MicroMapper {
    this.mappers.set(type, mapper);
    return this;
  }

  /**
   * Serialize a value 
   * @param {T} value - The value to serialize.
   * @param {Constructor} type - The type of the object to be serialized.
   * @returns A JSONValue
   */
  serializeType<T>(value: T, type: Constructor): JSONValue {
    const serializer = this.mappers.get(type);

    if (serializer != null)
      return serializer.serialize(value, type);

    throw new Error(`Serializer not found for type ${type.name}`);
  }

  /**
   * Deserialize a value 
   * @param {T} value - The value to deserialize.
   * @param {Constructor} type - The type of the object to be deserialized.
   * @returns A JSONValue
   */
  deserializeType<T>(value: JSONValue, type: Constructor): T {
    const deserializer = this.mappers.get(type);

    if (deserializer != null)
      return deserializer.deserialize(value, type);

    throw new Error(`Deserializer not found for type ${type.name}`);
  }

  /**
   * It takes a value and a schema, and returns a serialized value
   * @param {T} value - The value to serialize.
   * @param {Schema} schema - The schema to use to serialize the value.
   * @returns A object serialized as Plain Javascript Object
   */
  serializeSchema<T>(value: T, schema: Schema): JSONValue {
    const parsed = {};

    if (schema.props != null) {
      Object.entries(schema.props).forEach(
        ([prop, schema]) => {
          if (prop in value) {
            parsed[prop] = this.serialize(value[prop], schema);
          }
        });
    }

    return parsed;
  }

  /**
   * Deserializes the value according to a schema.
   * @param {JSONValue} value - The value to deserialize.
   * @param {Schema} schema - The schema to use to deserialize the value.
   * @returns An object deserialized .
   */
  deserializeSchema<T>(value: JSONValue, schema: Schema): T {
    const parsed = Object.create(
      schema.class.prototype
    );

    if (schema.props != null) {
      Object.entries(schema.props).forEach(
        ([prop, schema]) => {
          if (prop in value) {
            parsed[prop] = this.deserialize(value[prop], schema);
          }
        });
    }

    return parsed;
  }

  /**
   * Deserializes a value.
   * @param {JSONValue} value - The value to deserialize.
   * @param {Options} options - Schema or class used for the deserialization.
   * @returns An object deserialized.
   */
  deserialize<T>(value: JSONValue, options: Options): T {
    if (value instanceof Array) {
      return value.map((value, index) => (
        this.deserialize(value, options[index] ?? options[0])
      )) as unknown as T;
    }

    if (options instanceof Array) {
      throw new Error(`Schema error.`);
    }

    if (options instanceof Function) {
      return this.deserializeType(value, options)
    }

    return this.deserializeSchema(value, options);
  }

  /**
   * Serializes a value
   * @param {T | T[]} value - The value to serialize.
   * @param {Options} options - Schema or class used for the serialization
   * @returns The serialized value.
   */
  serialize<T>(value: T | T[], options: Options): JSONValue {
    if (value instanceof Array) {
      return value.map((value, index) => (
        this.serialize(value, options[index] ?? options[0])
      ));
    }

    if (options instanceof Array) {
      throw new Error(`Schema error`);
    }

    if (options instanceof Function) {
      return this.serializeType(value, options)
    }

    return this.serializeSchema(value, options);
  }
}