import { AbstractMapper } from "./AbstractMapper";

export class EachMapper<TInput, TOutput, TElement> extends AbstractMapper<TInput, TOutput[]> {
  #selector: (input: TInput) => Iterable<TElement>;
  #mapper: AbstractMapper<TElement, TOutput>;

  constructor(
    selector: (input: TInput) => Iterable<TElement>,
    mapper: AbstractMapper<TElement, TOutput>
  ) {
    super();
    this.#selector = selector;
    this.#mapper = mapper;
  }

  map(input: TInput): TOutput[] {
    const elements = this.#selector(input);

    const output: TOutput[] = [];

    for (const element of elements) {
      const value = this.#mapper.map(element);
      output.push(value)
    }

    return output;
  }
}