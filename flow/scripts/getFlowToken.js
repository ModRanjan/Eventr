const getFlowToken = `
  import FlowToken from 0xFLOW
  import FungibleToken from 0xFT

  pub fun main(address: Address): UFix64 {
    let account = getAccount(address)
    
    let vaultRef = account.getCapability(/public/flowTokenBalance)
          .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
          ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
  }
`;

export default getFlowToken;
