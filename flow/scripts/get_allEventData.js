import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

const getAllEventData = async () => {
  const get_all_eventData = `
        // get_all_eventData.cdc
        import Eventr1 from 0xEventr

        pub fun main(): [Eventr1.EventData] {
 
            let allEvents  = Eventr1.getAllEvents()

            return allEvents
        }
    `;

  return fcl.query({
    cadence: `${get_all_eventData}`,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorization: fcl.authz,
  });
};

export default getAllEventData;
