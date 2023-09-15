import {
  CHAIN,
  ConnectItem,
  ConnectItemReply,
  ConnectRequest,
  TonProofItemReply,
} from '@tonconnect/protocol';
import { Buffer } from 'buffer';
import { Int64LE } from 'int64-buffer';
import TonWeb from 'tonweb';
import { sign } from 'tweetnacl';
import { encodeBase64 } from 'tweetnacl-util';

import { getDomainFromURL, getNetwork, getTimeSec } from '../ton';
import { DAppManifest } from './types';

export class ConnectReplyBuilder {
  request: ConnectRequest;

  manifest: DAppManifest;

  constructor(request: ConnectRequest, manifest: DAppManifest) {
    this.request = request;
    this.manifest = manifest;
  }

  private static getNetwork() {
    return getNetwork() === 'mainnet' ? CHAIN.MAINNET : CHAIN.TESTNET;
  }

  private async createTonProofItem(
    address: string,
    secretKey: Uint8Array,
    payload: string,
  ): Promise<TonProofItemReply> {
    try {
      const timestamp = getTimeSec();
      const timestampBuffer = new Int64LE(timestamp).toBuffer();

      const domain = getDomainFromURL(this.manifest.url);
      const domainBuffer = Buffer.from(domain);
      const domainLengthBuffer = Buffer.allocUnsafe(4);
      domainLengthBuffer.writeInt32LE(domainBuffer.byteLength);

      const [workchain, addrHash] = address.split(':');

      const addressWorkchainBuffer = Buffer.allocUnsafe(4);
      addressWorkchainBuffer.writeInt32BE(Number(workchain));

      const addressBuffer = Buffer.concat([
        addressWorkchainBuffer,
        Buffer.from(addrHash, 'hex'),
      ]);

      const messageBuffer = Buffer.concat([
        Buffer.from('ton-proof-item-v2/', 'utf8'),
        addressBuffer,
        domainLengthBuffer,
        domainBuffer,
        timestampBuffer,
        Buffer.from(payload),
      ]);

      const bufferToSign = Buffer.concat([
        Buffer.from('ffff', 'hex'),
        Buffer.from('ton-connect', 'utf8'),
        Buffer.from(await TonWeb.utils.sha256(messageBuffer)),
      ]);

      const signed = sign.detached(
        Buffer.from(await TonWeb.utils.sha256(bufferToSign)),
        secretKey,
      );

      const signature = encodeBase64(signed);

      return {
        name: 'ton_proof',
        proof: {
          timestamp,
          domain: {
            lengthBytes: domainBuffer.byteLength,
            value: domain,
          },
          signature,
          payload,
        },
      };
    } catch (error) {
      return {
        name: 'ton_proof',
        error: {
          code: 0,
          message: `Wallet internal error: ${
            error instanceof Error ? error.message : ''
          }`,
        },
      };
    }
  }

  async createReplyItems(
    addr: string,
    privateKey: Uint8Array,
    publicKey: Uint8Array,
    walletStateInit: string,
  ): Promise<ConnectItemReply[]> {
    const address = new TonWeb.utils.Address(addr).toString(false, true, true);

    const replyItems = await Promise.all(
      this.request.items.map(async (requestItem): Promise<ConnectItemReply> => {
        switch (requestItem.name) {
          case 'ton_addr':
            return Promise.resolve({
              name: 'ton_addr',
              address,
              network: ConnectReplyBuilder.getNetwork(),
              publicKey: Buffer.from(publicKey).toString('hex'),
              walletStateInit,
            });
          case 'ton_proof':
            return await this.createTonProofItem(
              address,
              privateKey,
              requestItem.payload,
            );
          default:
            return Promise.resolve({
              name: (requestItem as ConnectItem).name,
              error: { code: 400 },
            } as unknown as ConnectItemReply);
        }
      }),
    );

    return replyItems;
  }

  static createAutoConnectReplyItems(
    addr: string,
    publicKey: Uint8Array,
    walletStateInit: string,
  ): ConnectItemReply[] {
    const address = new TonWeb.utils.Address(addr).toString(false, true, true);

    return [
      {
        name: 'ton_addr',
        address,
        network: ConnectReplyBuilder.getNetwork(),
        publicKey: Buffer.from(publicKey).toString('hex'),
        walletStateInit,
      },
    ];
  }
}
