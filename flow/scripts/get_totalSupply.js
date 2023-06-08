import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
/** 
 * getEventTotalSupply().then((transaction) => {
        console.log(transaction);
      });
 */
const getEventTotalSupply = async () => {
  const get_totalSupply = `
        // get_totalSupply.cdc
        import Eventr1 from 0xEventr

        // This script reads the current number of tokens that have been minted
        // from the Eventr contract and returns that number to the caller
        // Returns: UInt64
        // Number of Tokens minted from Eventr contract
        //
        pub fun main(): UInt64 {

            return Eventr1.totalSupply
        }
    `;

  return fcl.query({
    cadence: `${get_totalSupply}`,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorization: fcl.authz,
    limit: 999,
  });
};

export default getEventTotalSupply;
