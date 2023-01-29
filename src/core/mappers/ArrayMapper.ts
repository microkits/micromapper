import { Handler } from "../../types";
import { ValueMapper } from "./ValueMapper";

export class ArrayMapper<TInput, TOutput> extends ValueMapper<TInput, TOutput[]> {
  constructor(handler: Handler<TInput, TOutput[]>) {
    super(handler);
  }
}