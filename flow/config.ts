import * as fcl from '@onflow/fcl';

fcl.config({
  // This will be the title of our DApp
  'app.detail.title': 'Eventr',
  // We will also specify the network as some of the FCL parts need it to properly do it's work
  'flow.network': 'testnet',
  // Use Testnet Access Node
  'accessNode.api': 'https://rest-testnet.onflow.org',
  // Next two will define where Wallet Discovery is located
  'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  'discovery.authn.endpoint':
    'https://fcl-discovery.onflow.org/api/testnet/authn',
  // This is just a kitten photo, we will use for the icon
  'app.detail.icon': 'https://placekitten.com/g/200/200',
  // We will also set aliases for the contracts we will use in this example
  '0xFLOW': '0x7e60df042a9c0868', // 0xFLOW for FlowToken contract
  '0xFT': '0x9a0766d93b6608b7', // 0xFT for FungibleToken contract
  '0xProfile': '0xba1132bc08f82fe2', // The account address where the Profile smart contract lives on Testnet
});
