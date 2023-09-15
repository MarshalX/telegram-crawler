import TonWeb from 'tonweb';

const RECOVERY_ALGORITHM = { name: 'AES-GCM', length: 256 };
const RECOVERY_EXTRACTABLE = true;
const RECOVERY_KEY_USAGES: KeyUsage[] = ['encrypt', 'decrypt'];

interface EncryptedData {
  encryptedHex: string;
  ivHex: string;
}

interface RecoveryData {
  recoveryKeyHex: string;
  recoveryIvHex: string;
  encryptedShard1: string;
  encryptedShard2: string;
}

const generateRecoveryKey = async (): Promise<CryptoKey> => {
  const recoveryKey = await crypto.subtle.generateKey(
    RECOVERY_ALGORITHM,
    RECOVERY_EXTRACTABLE,
    RECOVERY_KEY_USAGES,
  );
  return recoveryKey;
};

const exportRecoveryKey = async (recoveryKey: CryptoKey): Promise<string> => {
  const exportKey = await crypto.subtle.exportKey('raw', recoveryKey);
  const exportArray = new Uint8Array(exportKey);
  return TonWeb.utils.bytesToHex(exportArray);
};

const importRecoveryKey = async (
  recoveryKeyHex: string,
): Promise<CryptoKey> => {
  const keyBytes = TonWeb.utils.hexToBytes(recoveryKeyHex);
  return await crypto.subtle.importKey(
    'raw',
    keyBytes,
    RECOVERY_ALGORITHM,
    RECOVERY_EXTRACTABLE,
    RECOVERY_KEY_USAGES,
  );
};

const encryptText = async (
  text: string,
  recoveryKey: CryptoKey,
): Promise<EncryptedData> => {
  // Convert the input string to ArrayBuffer
  const encoder = new TextEncoder();
  const textBuffer = encoder.encode(text);

  // Generate a random IV (Initialization Vector)
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Use 12 bytes for the IV in AES-GCM

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: RECOVERY_ALGORITHM.name, iv },
    recoveryKey,
    textBuffer,
  );
  const encryptedArray = new Uint8Array(encryptedBuffer);
  const encryptedHex = TonWeb.utils.bytesToHex(encryptedArray);

  const ivHex = TonWeb.utils.bytesToHex(iv);

  return { encryptedHex, ivHex };
};

const decryptText = async (
  encryptedHex: string,
  ivHex: string,
  recoveryKey: CryptoKey,
): Promise<string> => {
  // convert the encryptedHex to ArrayBuffer
  const encryptedArray = TonWeb.utils.hexToBytes(encryptedHex);
  const encryptedBuffer = Buffer.from(encryptedArray);

  // convert the ivHex to ArrayBuffer
  const ivArray = TonWeb.utils.hexToBytes(ivHex);
  const ivBuffer = Buffer.from(ivArray);

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: RECOVERY_ALGORITHM.name, iv: ivBuffer },
    recoveryKey,
    encryptedBuffer,
  );
  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
};

export const encryptMnemonic = async (
  mnemonic: string[],
): Promise<RecoveryData> => {
  const mnemonicString = mnemonic.join(' ');
  const recoveryKey = await generateRecoveryKey();
  const recoveryKeyHex = await exportRecoveryKey(recoveryKey);

  const encryptedData = await encryptText(mnemonicString, recoveryKey);

  const encryptedMnemonicMidpoint = encryptedData.encryptedHex.length / 2;
  const encryptedShard1 = encryptedData.encryptedHex.slice(
    0,
    encryptedMnemonicMidpoint,
  );
  const encryptedShard2 = encryptedData.encryptedHex.slice(
    encryptedMnemonicMidpoint,
  );

  return {
    recoveryKeyHex: recoveryKeyHex,
    recoveryIvHex: encryptedData.ivHex,
    encryptedShard1,
    encryptedShard2,
  };
};

export const decryptMnemonic = async (
  recoveryData: RecoveryData,
): Promise<string[]> => {
  const encryptedMnemonic = recoveryData.encryptedShard1.concat(
    recoveryData.encryptedShard2,
  );
  const recoveryKey = await importRecoveryKey(recoveryData.recoveryKeyHex);

  const mnemonicString = await decryptText(
    encryptedMnemonic,
    recoveryData.recoveryIvHex,
    recoveryKey,
  );
  return mnemonicString.split(' ');
};
