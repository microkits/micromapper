import { MapperBuilder } from "./core/MapperBuilder";
import { AbstractMapper } from "./core/mappers/AbstractMapper";
import { MapperFactory } from "./types";

export class MicroMapper<TInput, TOutput> extends AbstractMapper<TInput, TOutput>{
  #mapper: AbstractMapper<TInput, TOutput>;

  constructor(factory: MapperFactory<TInput, TOutput>) {
    super();
    this.#mapper = factory(
      new MapperBuilder<TInput>()
    );
  }

  map(input: TInput): TOutput {
    return this.#mapper.map(input);
  }
}