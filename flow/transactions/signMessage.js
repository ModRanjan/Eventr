const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
const { SHA3 } = require('sha3');
var EC = require('elliptic').ec;
var ec_p256 = new EC('p256');
var secp256k1 = new EC('secp256k1');

fcl.config().put('accessNode.api', 'https://testnet.onflow.org');

const sign = (message) => {
  const key = secp256k1.keyFromPrivate(
    Buffer.from(
      '0603982de285c7a6918b9f4e006f060b106a518658e17b9b8216a56a5668c3f6',
      'hex',
    ),
  );
  const sig = key.sign(hash(message)); // hashMsgHex -> hash
  const n = 32;
  const r = sig.r.toArrayLike(Buffer, 'be', n);
  const s = sig.s.toArrayLike(Buffer, 'be', n);
  return Buffer.concat([r, s]).toString('hex');
};

const hash = (message) => {
  const sha = new SHA3(256);
  sha.update(Buffer.from(message, 'hex'));
  return sha.digest();
};

const rightPaddedHexBuffer = (value, pad) => {
  return Buffer.from(value.padEnd(pad * 2, 0), 'hex');
};

const USER_DOMAIN_TAG = rightPaddedHexBuffer(
  Buffer.from('FLOW-V0.0-user').toString('hex'),
  32,
).toString('hex');

async function signMessage(message) {
  const msg = Buffer.from(message).toString('hex');
  console.log({ msg });

  const sig = sign(USER_DOMAIN_TAG + msg);
  console.log({ sig });

  const address = '0x4888621a47426aa0';
  const keyIndex = 0;

  const response = await fcl
    .send([
      fcl.script`
        pub fun main(address: Address, keyIndex: Int, sig: String, msg: String): Bool {
            let account = getAccount(address)
            let accountKey = account.keys.get(keyIndex: keyIndex) ?? panic("This keyIndex does not exist in this account")
            let key = accountKey.publicKey
            let sig = sig.decodeHex()
            let msg = msg.decodeHex()
            return key.verify (
                signature: sig, 
                signedData: msg, 
                domainSeparationTag: "FLOW-V0.0-user", 
                hashAlgorithm: HashAlgorithm.SHA3_256
            )
        }
    `,
      fcl.args([
        fcl.arg(address, t.Address),
        fcl.arg(keyIndex, t.Int),
        fcl.arg(sig, t.String),
        fcl.arg(msg, t.String),
      ]),
    ])
    .then(fcl.decode);

  console.log({ response });
}

export default { signMessage };
