import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

export const signMessage = async (message) => {
  const MSG = Buffer.from(message).toString('hex');

  return await fcl.currentUser.signUserMessage(MSG);
};
