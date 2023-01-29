import { Handler } from "../../types";
import { AbstractMapper } from "./AbstractMapper";

export class MapperMapper<TInput, TOutput> extends AbstractMapper<TInput, TOutput> {
  #handler: Handler<TInput, AbstractMapper<TInput, TOutput>>;

  constructor(handler: Handler<TInput, AbstractMapper<TInput, TOutput>>) {
    super();
    this.#handler = handler;
  }

  map(input: TInput): TOutput {
    if (input != null) {
      const mapper = this.#handler(input)

      if (mapper != null) {
        const output = mapper.map(input);

        if (output != null) {
          return output
        }
      }
    }
  }
}
