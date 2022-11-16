import { Mapper } from "./Mapper";
import { JSONValue } from "../MicroMapper.types";

export class DateMapper implements Mapper<typeof Date> {
  deserialize(value: JSONValue): Date {
    if (typeof (value) === "string" || typeof (value) === "number") {
      return new Date(value);
    }
  }

  serialize(value: unknown): JSONValue {
    if (value instanceof Date) {
      return value.toISOString();
    }
  }
}