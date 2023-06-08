import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

const getTokenMetadata = async (address, Id) => {
  const Cadence = `
        // get_token_metadata.cdc
        import Eventr1 from 0xEventr
        import MetadataViews from 0xMetadataViews
        
        pub fun main(address: Address, id: UInt64): Eventr1.EventrTokenMetadataView {
            let account = getAccount(address)
        
            let collectionRef = account.getCapability(Eventr1.CollectionPublicPath)
                .borrow<&{Eventr1.CollectionPublic}>()!
        
            let nft = collectionRef.borrowToken(id: id)!
            
            // Get the Top Shot specific metadata for this NFT
            let view = nft.resolveView(Type<Eventr1.EventrTokenMetadataView>())!
        
            let metadata = view as! Eventr1.EventrTokenMetadataView
            
            return metadata
        }
    `;

  return fcl.query({
    cadence: `${Cadence}`,
    args: (arg, t) => [
      arg(address.toString(), t.Address),
      arg(Id.toString(), t.UInt64),
    ],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorization: fcl.authz,
    limit: 999,
  });
};

export default getTokenMetadata;
