import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

const mintToken = async (eventID, categoryID, ownerAddr) => {
  console.log(
    `eventID: ${eventID}, categoryID: ${categoryID}, ownerAddr: ${ownerAddr}`,
  );
  const Cadence = ` 
    // mint_token
    import Eventr1 from 0xEventr
    import FlowToken from 0xFlowToken 
    import FungibleToken from 0xFungibleToken

    transaction(eventID: UInt64, categoryID: UInt64, ownerAddr: Address) {

      let eventOwnerCapability: &AnyResource{Eventr1.NFTMinterPublic}
  
      prepare(signer: AuthAccount) {
      
        let adminPublicPath = PublicPath(identifier: "EventrAdminEventId".concat(eventID.toString()))
          ?? panic("does not specify a public path")

        let senderFlowTokenVault = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
          ?? panic("Could not borrow Provider reference to the Vault")
          
        let eventOwnerAccount = getAccount(ownerAddr)
        
        // borrow a reference to the Admin resource in storage
        self.eventOwnerCapability =  eventOwnerAccount.getCapability(adminPublicPath).borrow<&{Eventr1.NFTMinterPublic}>()
          ?? panic("Cannot borrow a reference to the Admin's <MintNFTPublic> resource")

        let flowTokenVaultReceiverCapability: Capability<&FlowToken.Vault{FungibleToken.Receiver}> = eventOwnerAccount.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)

        // get the Collection reference for the receiver
        let collectionRef = signer.getCapability(Eventr1.CollectionPublicPath).borrow<&{Eventr1.CollectionPublic}>()
            ?? panic("Cannot borrow a reference to the Eventr Collection from recipient")
        
        log(senderFlowTokenVault.balance)
        
        self.eventOwnerCapability.mintToken(eventID: eventID, categoryID: categoryID, collection: collectionRef, ownerFlowTokenVault : flowTokenVaultReceiverCapability, buyerFlowTokenVault: senderFlowTokenVault)
      }
    }
  `;

  const payload = await fcl.args([
    fcl.arg(eventID, t.UInt64),
    fcl.arg(categoryID, t.UInt64),
    fcl.arg(ownerAddr, t.Address),
  ]);

  return await fcl.send([
    fcl.transaction(`${Cadence}`),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(999),
    payload,
  ]);
};
export default mintToken;
/**transaction(eventID: UInt64, categoryID: UInt64, ownerAddr: Address, recipientAddr: Address) {

      let eventOwnerCapability: &AnyResource{Eventr1.NFTMinterPublic}
  
      prepare(signer: AuthAccount) {
      
          let adminPublicPath = PublicPath(identifier: "EventrAdminEventId".concat(eventID.toString()))
              ?? panic("does not specify a public path")
  
          let senderFlowTokenVault = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
          ?? panic("Could not borrow Provider reference to the Vault")
          
          let eventOwnerAccount = getAccount(ownerAddr)
          
          // borrow a reference to the Admin resource in storage
          self.eventOwnerCapability =  eventOwnerAccount.getCapability(adminPublicPath).borrow<&{Eventr1.NFTMinterPublic}>()
              ?? panic("Cannot borrow a reference to the Admin's <MintNFTPublic> resource")
  
          let flowTokenVaultReceiverCapability: Capability<&FlowToken.Vault{FungibleToken.Receiver}> = eventOwnerAccount.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
  
          let recipientAccount = getAccount(recipientAddr)

        // get the Collection reference for the receiver
        let receiverCollectionRef = recipientAccount.getCapability(Eventr1.CollectionPublicPath).borrow<&{Eventr1.CollectionPublic}>()
          ?? panic("Cannot borrow a reference to the recipient's collection")
          
        self.eventOwnerCapability.mintToken(eventID: eventID, categoryID: categoryID, collection: receiverCollectionRef, ownerFlowTokenVault : flowTokenVaultReceiverCapability,buyerFlowTokenVault: senderFlowTokenVault)
      }
  } */
