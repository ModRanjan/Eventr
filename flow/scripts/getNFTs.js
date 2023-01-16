import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

export const getNFT = async () => {
  const GetNFT = `
      import Eventr from 0x60af25b344b0b6de
      import NonFungibleToken from 0x60af25b344b0b6de
    
      pub fun main(address: Address): [&Eventr.NFT?] {
        let account = getAccount(address)
        let collection = account.getCapability(Eventr.CollectionPublicPath)
                        .borrow<&Eventr.Collection{NonFungibleToken.CollectionPublic, Eventr.CollectionPublic}>()
                        ?? panic("Can't get the User's collection.")
                    
        let returnVals: [&Eventr.NFT?] = []
        let ids = collection.getIDs()
    
        for id in ids {
            returnVals.append(collection.borrowEntireNFT(id: id))
        }
    
        log(returnVals)
        return returnVals
      }
    `;

  return fcl.query({
    cadence: `${GetNFT}`,
    args: (arg, t) => [arg('0x4888621a47426aa0', t.Address)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorization: fcl.authz,
    limit: 999,
  });
};
