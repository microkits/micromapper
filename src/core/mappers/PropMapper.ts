import { AbstractMapper } from "./AbstractMapper";

export class PropMapper<TInput, TOutput, TElement> extends AbstractMapper<TInput, TOutput> {
  #selector: (input: TInput) => TElement;
  #mapper: AbstractMapper<TElement, TOutput>;

  constructor(
    selector: (input: TInput) => TElement,
    mapper: AbstractMapper<TElement, TOutput>
  ) {
    super();
    this.#selector = selector;
    this.#mapper = mapper;
  }

  map(input: TInput): TOutput {
    const element = this.#selector(input);
    const output = this.#mapper.map(element);

    if (output != null) {
      return output;
    }
  }
}