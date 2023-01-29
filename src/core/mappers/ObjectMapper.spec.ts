import { ObjectMapper } from './ObjectMapper';

describe('ObjectMapper', () => {

  interface Input {
    name: string;
    surname: string;
  }

  interface Output {
    fullName: string;
  }

  it('should map input to output', () => {
    const mapper = new ObjectMapper<Input, Output>({
      fullName: {
        map: (input: Input) => `${input.name} ${input.surname}`,
      },
    });

    const input = {
      name: 'John',
      surname: 'Doe'
    };

    const expectedOutput = {
      fullName: 'John Doe'
    };

    expect(mapper.map(input)).toEqual(expectedOutput);
  });

  it('should return undefined if a mapper is not provided for a key', () => {
    const mapper = new ObjectMapper<Input, Output>({});

    const input = {
      name: 'John',
      surname: 'Doe'
    };

    expect(mapper.map(input)).not.toHaveProperty("fullName")
  });

  it('should not include keys with undefined values in output', () => {
    const mapper = new ObjectMapper<Input, Output>({
      fullName: {
        map: () => undefined,
      },
    });

    const input = {
      name: 'John',
      surname: 'Doe'
    };

    expect(mapper.map(input)).not.toHaveProperty("fullName")
  });

});