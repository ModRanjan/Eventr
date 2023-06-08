import * as fcl from '@onflow/fcl';

fcl.config({
  'app.detail.title': 'Eventr',
  'flow.network': 'testnet',
  'accessNode.api': 'https://rest-testnet.onflow.org',
  'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  'discovery.authn.endpoint':
    'https://fcl-discovery.onflow.org/api/testnet/authn',
  // This is just a kitten photo, we will use for the icon
  'app.detail.icon':
    'https://bafkreigxfamybymhovs3lxgirpwwhdiigkjzx4eoy6cvy6ipcoi7qwcdsa.ipfs.nftstorage.link/',
  // 0xNonFungibleToken for NonFungibleToken contract
  '0xNonFungibleToken': '0x631e88ae7f1d7c20',
  '0xMetadataViews': '0x631e88ae7f1d7c20',
  // 0xFungibleToken for FungibleToken contract
  '0xFungibleToken': '0x9a0766d93b6608b7',
  // 0xFlowToken for FlowToken contract
  '0xFlowToken': '0x7e60df042a9c0868',
  // The account address where the Profile smart contract lives on Testnet
  '0xProfile': '0xba1132bc08f82fe2',
  '0xEventr': '0xaa93658e0adb6f4b',
});
