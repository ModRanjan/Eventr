import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

export const Mint = async () => {
  const MintNFT = `
    import Eventr from 0x60af25b344b0b6de
    import FlowToken from 0x7e60df042a9c0868 
    import FungibleToken from 0x9a0766d93b6608b7
    import NonFungibleToken from 0x60af25b344b0b6de

    transaction(_recipientAddress: Address, _ipfsHash: String, _name:String, _price: UFix64) {
        prepare(signer: AuthAccount) {
          if signer.borrow<&Eventr.Collection>(from: Eventr.CollectionStoragePath) == nil {
            signer.save(<- Eventr.createEmptyCollection(), to: Eventr.CollectionStoragePath)
      
            signer.link<&Eventr.Collection{Eventr.CollectionPublic, NonFungibleToken.CollectionPublic}>(Eventr.CollectionPublicPath , target: Eventr.CollectionStoragePath)
            
            signer.link<&Eventr.Collection>(Eventr.CollectionPrivatePath , target: Eventr.CollectionStoragePath)
            
            // let MyNFTCollection = signer.getCapability<&Eventr.Collection>(Eventr.CollectionPrivatePath)

            log("User stored Collection")
          }  
      
          if signer.borrow<&Eventr.MintNFT>(from: Eventr.MinterStoragePath) == nil {   
            signer.save(<- Eventr.createNFTMinter(), to: Eventr.MinterStoragePath)
            signer.link<&Eventr.MintNFT{Eventr.MintNFTPublic}>(Eventr.MinterPublicPath, target: Eventr.MinterStoragePath)
            log("User stored NFTMinter")
          }
           

          let collection = signer.borrow<&Eventr.Collection>(from: Eventr.CollectionStoragePath)
          ?? panic("User collection does not exist here")

          let nftMinter = signer.getCapability(Eventr.MinterPublicPath)
                                .borrow<&Eventr.MintNFT{Eventr.MintNFTPublic}>()
                                ?? panic("Could not borrow the user's NFTMinter resource")

          let _flowTokenVault = getAccount(_recipientAddress).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)

          let payment <- signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!.withdraw(amount: _price) as! @FlowToken.Vault

          nftMinter.mint(_ipfsHash: _ipfsHash, _name: _name, _price: _price,_payment: <-payment, _collection: collection,_flowTokenVault:_flowTokenVault)

          log("NFT minted")
        }
    }
    `;

  const transaction = fcl.mutate({
    cadence: `${MintNFT}`,
    args: (arg, t) => [
      arg('0x60af25b344b0b6de', t.Address),
      arg(
        'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        t.String,
      ),
      arg('firstNFT', t.String),
      arg('10.0', t.UFix64),
    ],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorization: fcl.authz,
    limit: 999,
  });
  console.log('transaction: ', transaction);
  return transaction;
};
