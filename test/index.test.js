const parser = require('../src/parser');

const tc = {
  0: {
    describe: 'Super simple',
    input: 'http://myurl.com?foo=bar',
    output: '{"foo":"bar"}'
  },
  1: {
    describe: 'Many levels',
    input: 'http://myurl.com?foo=bar&baz.bzz=zzb',
    output: '{"foo":"bar","baz":{"bzz":"zzb"}}'
  },
  2: {
    describe: 'Same names',
    input: 'http://myurl.com?foo=hi&bar=hello&foo=wassup',
    output: '{"foo":"wassup","bar":"hello"}'
  },
  3: {
    describe: 'Quotes',
    input: 'http://myurl.com?foo="42"&bar="hello"&baz="true"',
    output: '{"foo":"42","bar":"hello","baz":"true"}'
  },
  4: {
    describe: 'Datatypes',
    input: 'http://myurl.com?foo=42&bar=hello&baz=true',
    output: '{"foo":42,"bar":"hello","baz":true}'
  },
  5: {
    describe: 'Empty vals',
    input: 'http://myurl.com?foo=42&bar=&baz=true',
    output: '{"foo":42,"baz":true}'
  },
  6: {
    describe: 'Empty string',
    input: 'http://myurl.com',
    output: null
  },
  7: {
    describe: 'Wrong string',
    input: 'http://myurl.com?foo=42?baz=true'
  }
};

describe('positive test', () => {
  test(tc[0].describe, () => {
    expect(parser(tc[0].input)).toEqual(JSON.parse(tc[0].output));
  });
  test(tc[1].describe, () => {
    expect(parser(tc[1].input)).toEqual(JSON.parse(tc[1].output));
  });
  test(tc[2].describe, () => {
    expect(parser(tc[2].input)).toEqual(JSON.parse(tc[2].output));
  });
  test(tc[3].describe, () => {
    expect(parser(tc[3].input)).toEqual(JSON.parse(tc[3].output));
  });
  test(tc[4].describe, () => {
    expect(parser(tc[4].input)).toEqual(JSON.parse(tc[4].output));
  });
  test(tc[5].describe, () => {
    expect(parser(tc[5].input)).toEqual(JSON.parse(tc[5].output));
  });
  test(tc[6].describe, () => {
    expect(parser(tc[6].input)).toEqual(tc[6].output);
  });
  test(tc[7].describe, () => {
    expect(() => parser(tc[7].input)).toThrow();
  });
});