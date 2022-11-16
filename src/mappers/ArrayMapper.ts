import { JSONValue } from "../MicroMapper.types";
import { Mapper } from "./Mapper";

export class ArrayMapper implements Mapper<typeof Array> {
  serialize(value: Iterable<any>): JSONValue {
    if (Array.isArray(value))
      return value;

    return Array.from(value);
  }

  deserialize(value: JSONValue): unknown[] {
    if (Array.isArray(value))
      return value;
  }
}