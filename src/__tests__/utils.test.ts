// base64.test.js

import {
  base64ToBase64Url,
  decodeBase64Url,
  encodeBase64Url,
} from '../utils/base64';

describe('Base64 Encoding and Decoding', () => {
  const cases = [
    {
      input: 'Hello, World!',
      encoded: 'SGVsbG8sIFdvcmxkIQ',
      base64: 'SGVsbG8sIFdvcmxkIQ==',
    },
    {
      input: '¡Hola, Mundo!',
      encoded: 'wqFIb2xhLCBNdW5kbyE',
      base64: 'wqFIb2xhLCBNdW5kbyE=',
    },
    {
      input: 'こんにちは',
      encoded: '44GT44KT44Gr44Gh44Gv',
      base64: '44GT44KT44Gr44Gh44Gv',
    },
    {
      input: 'Привет, мир!',
      encoded: '0J_RgNC40LLQtdGCLCDQvNC40YAh',
      base64: '0J/RgNC40LLQtdGCLCDQvNC40YAh',
    },
    {
      input: '😊🌍🚀',
      encoded: '8J-YivCfjI3wn5qA',
      base64: '8J+YivCfjI3wn5qA',
    },
    {
      input: 'Ã¤é Ðõ÷ü',
      encoded: 'w4PCpMOpIMOQw7XDt8O8',
      base64: 'w4PCpMOpIMOQw7XDt8O8',
    },
    {
      input: 'こんにちは、世界',
      encoded: '44GT44KT44Gr44Gh44Gv44CB5LiW55WM',
      base64: '44GT44KT44Gr44Gh44Gv44CB5LiW55WM',
    },
    {
      input: '你好，世界！',
      encoded: '5L2g5aW977yM5LiW55WM77yB',
      base64: '5L2g5aW977yM5LiW55WM77yB',
    },
    { input: '', encoded: '', base64: '' },
  ];

  // Test encodeBase64Url
  describe('encodeBase64Url', () => {
    it('should encode ASCII and UTF-8 strings to Base64 correctly', () => {
      cases.forEach(({ input, encoded }) => {
        expect(encodeBase64Url(input)).toBe(encoded);
      });
    });
  });

  // Test decodeBase64Url
  describe('decodeBase64Url', () => {
    it('should decode Base64 strings back to original strings', () => {
      cases.forEach(({ input, encoded }) => {
        expect(decodeBase64Url(encoded)).toBe(input);
      });
    });
  });

  // Test round-trip encoding and decoding
  describe('round-trip encoding and decoding', () => {
    it('should return the original string after encoding and decoding', () => {
      cases.forEach(({ input }) => {
        const encoded = encodeBase64Url(input);
        const decoded = decodeBase64Url(encoded);
        expect(decoded).toBe(input);
      });
    });
  });

  describe('base64ToBase64Url', () => {
    it.each`
      base64            | base64Url
      ${'YQ=='}         | ${'YQ'}
      ${'YWI='}         | ${'YWI'}
      ${'YWJj'}         | ${'YWJj'}
      ${'+/8='}         | ${'-_8'}
      ${'+++///'}       | ${'---___'}
      ${'8J+YivCfjI3w'} | ${'8J-YivCfjI3w'}
      ${''}             | ${''}
    `('should convert "$base64" to "$base64Url"', ({ base64, base64Url }) => {
      expect(base64ToBase64Url(base64)).toBe(base64Url);
    });

    it('should convert the standard base64 encoding of strings to base64url', () => {
      cases.forEach(({ base64, encoded }) => {
        expect(base64ToBase64Url(base64)).toBe(encoded);
      });
    });
  });
});
