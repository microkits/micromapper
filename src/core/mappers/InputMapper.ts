import { AbstractMapper } from "./AbstractMapper";

export class InputMapper<TValue> extends AbstractMapper<TValue, TValue> {
  map(input: TValue): TValue {
    return input;
  }
}