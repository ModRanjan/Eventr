import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

export const createCollection = async () => {
  const CreateCollection = `
    import Eventr from 0x60af25b344b0b6de
    import FlowToken from 0x7e60df042a9c0868 
    import FungibleToken from 0x9a0766d93b6608b7
    import NonFungibleToken from 0x60af25b344b0b6de

    transaction (){
      prepare(acct: AuthAccount) {
        if acct.borrow<&Eventr.Collection>(from: Eventr.CollectionStoragePath) == nil {
          acct.save(<- Eventr.createEmptyCollection(), to: Eventr.CollectionStoragePath)

          acct.link<&Eventr.Collection{Eventr.CollectionPublic, NonFungibleToken.CollectionPublic}>(Eventr.CollectionPublicPath , target: Eventr.CollectionStoragePath)
          
          acct.link<&Eventr.Collection>(Eventr.CollectionPrivatePath , target: Eventr.CollectionStoragePath)
          
          let MyNFTCollection = acct.getCapability<&Eventr.Collection>(Eventr.CollectionPrivatePath)

          log("A user stored a Collection inside their account")
        }  
      }
    }
    `;

  return fcl.mutate({
    cadence: `${CreateCollection}`,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorization: fcl.authz,
    limit: 999,
  });
};
