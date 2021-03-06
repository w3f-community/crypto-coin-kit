import {Result} from '../../Common/sign';
import {schnorrkelSign} from '@polkadot/util-crypto';
import {bufferToU8a, u8aToHex} from '@polkadot/util/index';

const SEC_LEN = 64;
const PUB_LEN = 32;

function schnorrkelKeypairFromU8a (full: Uint8Array) {
  return {
    publicKey: full.slice(SEC_LEN, SEC_LEN + PUB_LEN),
    secretKey: full.slice(0, SEC_LEN)
  };
}

export const sr25519KeyProvider = (privateKey: string, publicKey: string) => {
  return {
    publicKey,
    sign: async (hex: Uint8Array): Promise<Result> => {
      const prikey = privateKey.slice(2);
      const pubkey = publicKey.slice(2);
      const keypair = schnorrkelKeypairFromU8a(
        bufferToU8a(Buffer.from(prikey + pubkey, 'hex')),
      );
      const sigHex = u8aToHex(schnorrkelSign(hex, keypair));
      return {
        r: sigHex.slice(0, 64),
        s: sigHex.slice(64, 128),
        recId: 0,
      };
    },
  };
};

export const sr25519KeyProviderSync = (
  privateKey: string,
  publicKey: string,
) => {
  return {
    publicKey,
    sign: (hex: string): Result => {
      const prikey = privateKey.slice(2);
      const pubkey = publicKey.slice(2);
      const keypair = schnorrkelKeypairFromU8a(
        bufferToU8a(Buffer.from(prikey + pubkey, 'hex')),
      );
      const sigHex = u8aToHex(schnorrkelSign(hex, keypair)).slice(2);
      return {
        r: sigHex.slice(0, 64),
        s: sigHex.slice(64, 128),
        recId: 0,
      };
    },
  };
};
