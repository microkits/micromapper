import { MicroMapper } from "./MicroMapper";

describe('MicroMapper', () => {
  describe('map', () => {
    it('should map input to output correctly', () => {
      const mapper = new MicroMapper<string, string>((mapper) => (
        mapper.value((input) => input.toUpperCase())
      ));

      const input = 'hello';
      const expectedOutput = 'HELLO';
      expect(mapper.map(input)).toEqual(expectedOutput);
    });
  });
});