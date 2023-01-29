export abstract class AbstractMapper<TInput, TOutput> {
  abstract map(input: TInput): TOutput;
}
