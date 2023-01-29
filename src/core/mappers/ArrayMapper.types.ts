import { Constructor } from "../../types";
import { ClassMapperOptions } from "./ClassMapper.types";

export type ArrayMapperOptions<TInput, TOutput extends Constructor> = ClassMapperOptions<TInput, TOutput>