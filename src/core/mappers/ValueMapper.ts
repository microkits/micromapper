import { Handler } from "../../types";
import { AbstractMapper } from "./AbstractMapper";

export class ValueMapper<TInput, TOutput> extends AbstractMapper<TInput, TOutput> {
  #handler: Handler<TInput, TOutput>;

  constructor(handler: Handler<TInput, TOutput>) {
    super();
    this.#handler = handler;
  }

  map(input: TInput): TOutput {
    if (input != null) {
      const output = this.#handler(input);

      if (output != null) {
        return output;
      }
    }
  }
}
