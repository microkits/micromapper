import { Mapper } from "./Mapper";
import { JSONValue } from "../MicroMapper.types";

export class PrimitiveMapper implements Mapper {
  deserialize(value: JSONValue, type: Function): unknown {
    return type(value).valueOf()
  }
  
  serialize(value: unknown, type: Function): JSONValue {
    if (value != null)
      return type(value).valueOf()
  }
}
