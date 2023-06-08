import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

const removeCollection = async () => {
  const removeEventrTestCollection = `
      // removeCollection.cdc
      import Eventr1 from 0x433bea3c08540c40
      
      transaction {
          prepare(signer: AuthAccount) {
      
          let collection <- signer.load<@Eventr1.Collection>(from: Eventr1.CollectionStoragePath)
          destroy collection
        }
      }
    `;

  return await fcl.send([
    fcl.transaction(`${removeEventrTestCollection}`),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(999),
  ]);
};

export default removeCollection;
