import { Constructor } from "../../types";
import { AbstractMapper } from "./AbstractMapper";
import { ClassMapperArgs, ClassMapperOptions, ClassMapperProps } from "./ClassMapper.types";

export class ClassMapper<TInput, TOutput extends Constructor> extends AbstractMapper<TInput, InstanceType<TOutput>> {
  #type: TOutput;
  #options: ClassMapperOptions<TInput, TOutput>;

  constructor(type: TOutput, options?: ClassMapperOptions<TInput, TOutput>) {
    super()
    this.#type = type;
    this.#options = options ?? {};
  }

  args(args: ClassMapperArgs<TInput, TOutput>): this {
    this.#options.args = args;
    return this;
  }

  props(props: ClassMapperProps<TInput, TOutput>): this {
    this.#options.props = props;
    return this;
  }

  map(input: TInput): InstanceType<TOutput> {
    const args = [];

    for (const key in this.#options.args) {
      const mapper = this.#options.args[key];

      args.push(mapper.map(input));
    }

    const instance = Reflect.construct(this.#type, args)

    for (const key in this.#options.props) {
      const mapper = this.#options.props[key];
      const value = mapper.map(input);

      if (value != null)
        instance[key] = value
    }

    return instance;
  }
}