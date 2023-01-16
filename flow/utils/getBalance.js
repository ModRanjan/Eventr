import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import getFlowToken from '../scripts/getFlowToken';

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
  const cadence = `
      import FungibleToken from 0xFT
      import FlowToken from 0xFLOW
  
      transaction(recepient: Address, amount: UFix64){
        prepare(signer: AuthAccount){
          let sender = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Could not borrow Provider reference to the Vault")
  
          let receiverAccount = getAccount(recepient)
  
          let receiver = receiverAccount.getCapability(/public/flowTokenReceiver)
            .borrow<&FlowToken.Vault{FungibleToken.Receiver}>()
            ?? panic("Could not borrow Receiver reference to the Vault")
  
          let tempVault <- sender.withdraw(amount: amount)
          receiver.deposit(from: <- tempVault)
        }
      }
    `;
  const args = (arg, t) => [arg(recepient, t.Address), arg(amount, t.UFix64)];
  const limit = 500;

  const txId = await mutate({ cadence, args, limit });

  console.log('Waiting for transaction to be sealed...');

  const txDetails = await tx(txId).onceSealed();
  console.log({ txDetails });
};
