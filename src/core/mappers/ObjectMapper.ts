import { AbstractMapper } from "./AbstractMapper";
import { ObjectMapperOptions } from "./ObjectMapper.types";

export class ObjectMapper<TInput, TOutput> extends AbstractMapper<TInput, TOutput> {
  #options: ObjectMapperOptions<TInput, TOutput>;

  constructor(options: ObjectMapperOptions<TInput, TOutput>) {
    super();
    this.#options = options;
  }

  map(input: TInput): TOutput {
    const instance: Partial<TOutput> = {};

    for (const key in this.#options) {
      const mapper = this.#options[key];
      const value = mapper.map(input);

      if (value != null)
        instance[key] = value
    }

    return instance as TOutput;
  }
}
