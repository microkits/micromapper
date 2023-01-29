import { AbstractMapper } from "./AbstractMapper";

export type ObjectMapperOptions<TInput, TOutput> = {
  [K in keyof TOutput]?: AbstractMapper<TInput, TOutput[K]>
}