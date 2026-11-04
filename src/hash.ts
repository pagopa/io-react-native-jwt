import { base64ToBase64Url } from './utils/base64';
import { IoReactNativeJwt } from './utils/proxy';

/**
 * Return the base64url encoded (unpadded) SHA256 hash of the input string
 */
export const sha256ToBase64Url = async (toHash: string): Promise<string> => {
  let hash = await IoReactNativeJwt.sha256(toHash);
  return base64ToBase64Url(hash);
};
