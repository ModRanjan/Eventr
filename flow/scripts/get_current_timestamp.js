import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

const getCurrentTimestamp = async () => {
  const Cadence = `
        // get_current_timestamp.cdc
        
        pub fun main(): UFix64 {
            let currentTimestamp = getCurrentBlock().timestamp

            return currentTimestamp
        }
    `;

  return fcl.query({
    cadence: `${Cadence}`,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorization: fcl.authz,
    limit: 999,
  });
};

export default getCurrentTimestamp;

/** how to use
  const getTimestamp = async () => {
    try {
      const transaction = await getCurrentTimestamp();
      console.log('timestamp: ', transaction);
    } catch (error) {
      console.log(error);
    }
  };
 */
