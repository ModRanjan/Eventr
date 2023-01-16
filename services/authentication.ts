import axios from '@/services/index';

const login = async (walletAddress: string, signature: String) => {
  const result = await axios
    .post(`/login`, {
      walletAddress,
      signature,
    })
    .catch((e) => {
      console.log(e.response);
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

const signAndLogin = async (walletAddress: string) => {
  const msgToSigned = await getSigningMessage(walletAddress);

  console.log('signMessage: ', msgToSigned);
  return new Promise((resolve, reject) => {
    // const transactionId = fcl
    //   .send([
    //     fcl.transaction(),
    //     fcl.args([
    //       fcl.arg(msgToSigned, t.string),
    //       fcl.arg(walletAddress, t.address),
    //     ]),
    //     fcl.payer(fcl.authz),
    //     fcl.proposer(fcl.authz),
    //     fcl.authorization(fcl.authz),
    //     fcl.limit(999),
    //   ])
    //   .then(fcl.decode);

    // transactionId.onceSeald();
    const signature = '';
    login(walletAddress, signature)
      .then((response) => {
        const currentUser = response;
        resolve(currentUser);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

const getSigningMessage = async (walletAddress: string) => {
  try {
    const response = await axios.post('/getSigningMessage', { walletAddress });
    const { message, data } = response.data;

    if (message === 'success') {
      const messageToSigned = data.messageToSigned;
      console.log('messageToSigned: ', messageToSigned);

      return messageToSigned;
    } else throw console.error(message);
  } catch (error) {
    console.log(error);
  }
};

export { login, signInOrSignUp };
