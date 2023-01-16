import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

export const nftMinter = async () => {
  const cadence = `
    import Eventr from 0x60af25b344b0b6de
    import FlowToken from 0x7e60df042a9c0868 
    import FungibleToken from 0x9a0766d93b6608b7
    import NonFungibleToken from 0x60af25b344b0b6de

    transaction (){
      prepare(acct: AuthAccount) { 
        if acct.borrow<&Eventr.MintNFT>(from: Eventr.MinterStoragePath) == nil {   
          acct.save(<- Eventr.createNFTMinter(), to: Eventr.MinterStoragePath)
          acct.link<&Eventr.MintNFT{Eventr.MintNFTPublic}>(Eventr.MinterPublicPath, target: Eventr.MinterStoragePath)
          log("A user stored a NFTMinter inside their account")
        }
        else {
          log("This User already has NFTMinter inside his account")
        }
      }
    }
    `;

  return fcl.mutate({
    cadence: `${cadence}`,
    args: [],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorization: fcl.authz,
    limit: 999,
  });
};
