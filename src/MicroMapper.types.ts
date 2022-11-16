export type Constructor<T = unknown> = (
  abstract new (...args: unknown[]) => T
);

export interface Schema {
  class: Constructor;
  props: {
    [key: string]: Options
  }
}

export type Options = Schema | Schema[] | Constructor | Constructor[] | Options[]

export type Primitive =
  | BigInt
  | Boolean
  | Number
  | String
  | Symbol;

export type JSONObject = {
  [key: string]: JSONValue;
}

export type JSONArray = Array<JSONValue>;

export type JSONValue = Primitive | JSONObject | JSONArray;
