import { MapperMapper } from './MapperMapper';

describe('MapperMapper', () => {
  it('should map input to output', () => {
    interface Input {
      name: string;
    }

    const input: Input = {
      name: 'John Doe'
    }

    const mapper = new MapperMapper<Input, string>((input) => ({
      map: (input) => input.name
    }));

    const output = mapper.map(input)
    expect(output).toEqual(input.name)
  });

  it('should return undefined if mapper is not defined', () => {
    interface Input {
      name: string;
    }

    const input: Input = {
      name: 'John Doe'
    }

    const mapper = new MapperMapper<Input, string>((input) => undefined);

    const output = mapper.map(input)
    expect(output).toBeUndefined()
  });

  it('should return undefined if input is not defined', () => {
    interface Input {
      name: string;
    }

    const mapper = new MapperMapper<Input, string>((input) => ({
      map: (input) => input?.name
    }))

    const output = mapper.map(undefined)
    expect(output).toBeUndefined()
  });
});