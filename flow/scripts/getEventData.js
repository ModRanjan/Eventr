import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

const getContractEventData = async (eventID) => {
  const getEventData = `
        // setup_account.cdc
        import Eventr1 from 0xEventr
        
        // This script returns all the metadata about the specified event
        // Parameters:
        //
        // setID: The unique ID for the event whose data needs to be read
        // Returns: Eventr.QueryEventData
        pub fun main(eventID: UInt64): Eventr1.QueryEventData {
        
            let data = Eventr1.getEventData(eventID: eventID)
                ?? panic("Could not get data for the specified event ID")
        
            return data
        }
      `;

  return fcl.query({
    cadence: `${getEventData}`,
    args: (arg, t) => [arg(eventID.toString(), t.UInt64)],
  });
};

export default getContractEventData;

/**
 * try {
      const transactions = await getContractEventData(eventId);
      console.log(transactions);
    } catch (error: any) {
      console.log('GetContractEvents Error: ', error.message);
      toast.error(error.message);
    }
 */
