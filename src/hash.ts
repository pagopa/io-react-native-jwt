import { removePadding } from './utils/base64';
import { IoReactNativeJwt } from './utils/proxy';

/**
 * Return base64 encoded SHA256 hash of input string
 */
export const sha256ToBase64 = async (toHash: string): Promise<string> => {
  let hash = await IoReactNativeJwt.sha256(toHash);
  return removePadding(hash);
};
