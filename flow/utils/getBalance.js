import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import getFlowToken from '../scripts/getFlowToken';
import transferFlowToken from '../transactions/transfer_flow-token';

export const getFlowBalance = async (address) => {
  const balance = await fcl
    .send([
      fcl.script(`${getFlowToken}`),
      fcl.args([fcl.arg(address, t.Address)]),
    ])
    .then(fcl.decode);

  return balance;
};

export const sendFlow = async (recepient, amount) => {
  const args = (arg, t) => [arg(recepient, t.Address), arg(amount, t.UFix64)];
  const limit = 500;

  const txId = await mutate({ transferFlowToken, args, limit });

  console.log('Waiting for transaction to be sealed...');

  const txDetails = await tx(txId).onceSealed();
  console.log({ txDetails });
};
