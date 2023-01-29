import { MapperBuilder } from "./core/MapperBuilder";
import { AbstractMapper } from "./core/mappers/AbstractMapper";

export type Constructor<T = unknown> = (
  abstract new (...args: unknown[]) => T
);

export type Handler<TInput, TOutput> = {
  (input?: TInput): TOutput;
}

export interface MapperFactory<TInput, TOutput> {
  (builder: MapperBuilder<TInput>): AbstractMapper<TInput, TOutput>
}

export type FunctionOrReturnType<F extends (...args: unknown[]) => unknown> = (
  F | ReturnType<F>
);
