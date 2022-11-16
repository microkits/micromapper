import { Constructor, JSONValue } from "../MicroMapper.types";

export interface Mapper<T extends Constructor = any> {
  serialize(value: InstanceType<T>, type: T): JSONValue;
  deserialize(value: JSONValue, type: T): InstanceType<T>;
}