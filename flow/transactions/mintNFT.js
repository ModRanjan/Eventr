import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

export const mintNFT = async () => {
  const cadence = ` 
    import Eventr from 0x60af25b344b0b6de
    import FlowToken from 0x7e60df042a9c0868 
    import FungibleToken from 0x9a0766d93b6608b7
 
    
    transaction(_recipientAddress: Address, _ipfsHash: String, _name:String, _price: UFix64) {
        prepare(signer: AuthAccount) {
            // pre {
            //     _ipfsHash!="undefined" : "Undefined Arguments: ipfs"
            //     _name!="undefined" : "Undefined Arguments: name"
            // }

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
  return fcl.mutate({
    cadence: `${cadence}`,
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
};
