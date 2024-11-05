// base64.test.js

import { decodeBase64, encodeBase64 } from '../utils/base64';

describe('Base64 Encoding and Decoding', () => {
  const cases = [
    { input: 'Hello, World!', encoded: 'SGVsbG8sIFdvcmxkIQ' },
    { input: '¡Hola, Mundo!', encoded: 'wqFIb2xhLCBNdW5kbyE' },
    { input: 'こんにちは', encoded: '44GT44KT44Gr44Gh44Gv' },
    { input: 'Привет, мир!', encoded: '0J_RgNC40LLQtdGCLCDQvNC40YAh' },
    { input: '😊🌍🚀', encoded: '8J-YivCfjI3wn5qA' },
    { input: 'Ã¤é Ðõ÷ü', encoded: 'w4PCpMOpIMOQw7XDt8O8' },
    {
      input: 'こんにちは、世界',
      encoded: '44GT44KT44Gr44Gh44Gv44CB5LiW55WM',
    },
    { input: '你好，世界！', encoded: '5L2g5aW977yM5LiW55WM77yB' },
    { input: '', encoded: '' },
  ];

  // Test encodeBase64
  describe('encodeBase64', () => {
    it('should encode ASCII and UTF-8 strings to Base64 correctly', () => {
      cases.forEach(({ input, encoded }) => {
        expect(encodeBase64(input)).toBe(encoded);
      });
    });
  });

  // Test decodeBase64
  describe('decodeBase64', () => {
    it('should decode Base64 strings back to original strings', () => {
      cases.forEach(({ input, encoded }) => {
        expect(decodeBase64(encoded)).toBe(input);
      });
    });
  });

  // Test round-trip encoding and decoding
  describe('round-trip encoding and decoding', () => {
    it('should return the original string after encoding and decoding', () => {
      cases.forEach(({ input }) => {
        const encoded = encodeBase64(input);
        const decoded = decodeBase64(encoded);
        expect(decoded).toBe(input);
      });
    });
  });
});
