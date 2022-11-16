import { Mapper } from "./Mapper";
import { JSONValue } from "../MicroMapper.types";

export class MapMapper implements Mapper<typeof Map> {
  deserialize(value: JSONValue): Map<unknown, unknown> {
    return new Map(
      Object.entries(value)
    );
  }

  serialize(value: Map<unknown, unknown>): JSONValue {
    if (value instanceof Map)
      return Object.fromEntries(value)
  }
}