import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

const getCollctionIds = async (AccountAddr) => {
  const Cadence = `
    // get_collection_ids.cdc
import Eventr1 from  0xEventr

// This is the script to get a list of all the token' ids an account owns
// Just change the argument to getAccount to whatever account you want
// and as long as they have a published Collection receiver, you can see
// the tokens they own.
// Parameters:
//
// account: The Flow Address of the account whose token data needs to be read
// Returns: [UInt64]
// list of all tokens' ids an account owns
pub fun main(account: Address): [UInt64] {

    let acct = getAccount(account)

    let collectionRef = acct.getCapability(Eventr1.CollectionPublicPath)
      .borrow<&{Eventr1.CollectionPublic}>()!

    log(collectionRef.getIDs())

    return collectionRef.getIDs()
}
`;

  return fcl.query({
    cadence: `${Cadence}`,
    args: (arg, t) => [arg(AccountAddr.toString(), t.Address)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorization: fcl.authz,
    limit: 999,
  });
};

export default getCollctionIds;
