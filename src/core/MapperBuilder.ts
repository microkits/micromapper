import { AbstractMapper } from "./mappers/AbstractMapper";
import { ArrayMapper } from "./mappers/ArrayMapper";
import { ClassMapper } from "./mappers/ClassMapper";
import { ClassMapperOptions } from "./mappers/ClassMapper.types";
import { MapperMapper } from "./mappers/MapperMapper";
import { ObjectMapper } from "./mappers/ObjectMapper";
import { ObjectMapperOptions } from "./mappers/ObjectMapper.types";
import { ValueMapper } from "./mappers/ValueMapper";
import { Constructor, FunctionOrReturnType, Handler, MapperFactory } from "../types";
import { EachMapper } from "./mappers/EachMapper";
import { InputMapper } from "./mappers/InputMapper";
import { PropMapper } from "./mappers/PropMapper";

export class MapperBuilder<TInput> {
  array<TOutput>(handler: Handler<TInput, TOutput[]>): ArrayMapper<TInput, TOutput> {
    return new ArrayMapper(handler)
  }

  bigint(handler: Handler<TInput, bigint>): ValueMapper<TInput, bigint> {
    return new ValueMapper(handler);
  }

  boolean(handler: Handler<TInput, boolean>): ValueMapper<TInput, boolean> {
    return new ValueMapper(handler);
  }

  class<TOutput extends Constructor>(type: TOutput, options?: ClassMapperOptions<TInput, TOutput>): ClassMapper<TInput, TOutput> {
    return new ClassMapper(type, options)
  }

  date(handler: Handler<TInput, Date>): ValueMapper<TInput, Date> {
    return new ValueMapper(handler);
  }

  each<TOutput, TElement>(
    selector: (input: TInput) => Iterable<TElement>,
    mapper: FunctionOrReturnType<MapperFactory<TElement, TOutput>>
  ): EachMapper<TInput, TOutput, TElement> {
    if (typeof mapper === "function") {
      mapper = mapper(
        new MapperBuilder<TElement>()
      );
    }

    return new EachMapper(selector, mapper);
  }

  input<TValue>(): InputMapper<TValue> {
    return new InputMapper();
  }

  mapper<TOutput>(handler: Handler<TInput, AbstractMapper<TInput, TOutput>>): MapperMapper<TInput, TOutput> {
    return new MapperMapper(handler);
  }

  prop<TOutput, TElement>(
    selector: (input: TInput) => TElement,
    mapper: FunctionOrReturnType<MapperFactory<TElement, TOutput>>
  ) {
    if (typeof mapper === "function") {
      mapper = mapper(
        new MapperBuilder<TElement>()
      );
    }

    return new PropMapper(selector, mapper);
  }

  number(handler: Handler<TInput, number>): ValueMapper<TInput, number> {
    return new ValueMapper(handler);
  }

  object<TOutput>(options: ObjectMapperOptions<TInput, TOutput>): ObjectMapper<TInput, TOutput> {
    return new ObjectMapper(options);
  }

  string(handler: Handler<TInput, string>): ValueMapper<TInput, string> {
    return new ValueMapper(handler)
  }

  symbol(handler: Handler<TInput, symbol>): ValueMapper<TInput, symbol> {
    return new ValueMapper(handler);
  }

  value<TOutput>(handler: Handler<TInput, TOutput>): ValueMapper<TInput, TOutput> {
    return new ValueMapper(handler);
  }
}