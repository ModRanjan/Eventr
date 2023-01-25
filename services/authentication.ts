import axios from '@/services/index';
import { toast } from 'react-toastify';

import { signMessage } from '@/flow/utils/signMessage';

const login = async (
  walletAddress: string,
  signature: String,
  walletName: String,
  compositeSignatures: object,
) => {
  const result = await axios
    .post(`/login`, {
      walletAddress,
      signature,
      walletName,
      compositeSignatures,
    })
    .catch((e) => {
      return e.response;
    });

  return result;
};

const signInOrSignUp = (walletAddress: string) => {
  return new Promise((resolve, reject) => {
    signAndLogin(walletAddress)
      .then((currentUser) => {
        resolve(currentUser);
      })
      .catch((e) => reject(e));
  });
};

const getSigningMessage = async (walletAddress: string) => {
  try {
    const response = await axios.post('/getSigningMessage', { walletAddress });
    const { message, data } = response.data;

    if (message === 'success') {
      const messageToSigned = data.messageToSigned;

      return messageToSigned;
    } else throw Error(message);
  } catch (error) {
    toast.error(`getSigningMessage error: ${error}`);
  }
};

const sign = async (msgToSigned: string) => {
  try {
    const sign = await signMessage(msgToSigned);

    if (sign.length) {
      const signedObj = sign[0];

      return signedObj;
    } else return { error: sign };
  } catch (error) {
    return { error };
  }
};

const signAndLogin = async (walletAddress: string) => {
  const msgToSigned = await getSigningMessage(walletAddress);

  return new Promise((resolve, reject) => {
    sign(msgToSigned)
      .then((userSign) => {
        const compositeSignatures = userSign;

        if ('error' in compositeSignatures) {
          toast.error(
            `${compositeSignatures.error}. Feel free to login when you are ready!`,
          );
          return;
        }

        const walletName = 'blocto';
        const { addr, keyId, signature, f_type, f_vsn } = compositeSignatures;

        login(walletAddress, signature, walletName, compositeSignatures)
          .then((response) => {
            const currentUser = response;
            resolve(currentUser);
          })
          .catch((e) => {
            reject(e);
          });
      })
      .catch((error) => {
        toast.error(`Login failed! ${error}`);
      });
  });
};

export { login, signInOrSignUp };
