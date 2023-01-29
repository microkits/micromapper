import { Constructor } from "../../types";
import { AbstractMapper } from "./AbstractMapper";

export type Mapped<TInput, TOutput> = {
  [K in keyof TOutput]?: TOutput[K] extends () => void ? never : AbstractMapper<TInput, TOutput[K]>
}

export type ClassMapperProps<TInput, TOutput extends Constructor> = Mapped<TInput, InstanceType<TOutput>>;

export type ClassMapperArgs<TInput, TOutput extends Constructor> = Mapped<TInput, ConstructorParameters<TOutput>>;

export type ClassMapperOptions<TInput, TOutput extends Constructor> = {
  props?: ClassMapperProps<TInput, TOutput>;
  args?: ClassMapperArgs<TInput, TOutput>;
}