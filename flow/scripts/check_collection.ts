import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import { Address, Int } from '@onflow/types';

const checkAccountHasCollection = async (address: string): Promise<boolean> => {
  const Cadence = `
    import Eventr1 from 0xEventr

    pub fun main(account: Address): Bool {
        // Get the user's account
        let userAccount = getAccount(account)

        let collectionRef = userAccount.getCapability(Eventr1.CollectionPublicPath).borrow<&{Eventr1.CollectionPublic}>()?? nil

        // Check if the Collection resource exists
        if collectionRef != nil {
            return true
        } else {
            return false
        }
    }
  `;

  return await fcl.query({
    cadence: `${Cadence}`,
    args: (arg: (arg0: string, arg1: any) => any, t: { Address: any }) => [
      arg(address, Address),
    ],
  });
};

export default checkAccountHasCollection;
