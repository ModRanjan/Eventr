import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

const createEmptyCollection = async () => {
  const Cadence = ` 
    // create_empty_collection
    import Eventr1 from 0xEventr
    import NonFungibleToken from 0xNonFungibleToken
    import MetadataViews from 0xMetadataViews

    
    transaction {

      prepare(signer: AuthAccount) {
        // First, check to see if collection already exists
        if signer.borrow<&Eventr1.Collection>(from: Eventr1.CollectionStoragePath) == nil {

          let collection <- Eventr1.createEmptyCollection() as! @Eventr1.Collection

          signer.save(<-collection, to: Eventr1.CollectionStoragePath)

          signer.link<&{NonFungibleToken.CollectionPublic, Eventr1.CollectionPublic, MetadataViews.ResolverCollection}>(Eventr1.CollectionPublicPath, target: Eventr1.CollectionStoragePath)
        } else {
          log("You already have Collection")
        }
      }
    }
  `;

  return await fcl.send([
    fcl.transaction(`${Cadence}`),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(999),
  ]);
};
export default createEmptyCollection;
