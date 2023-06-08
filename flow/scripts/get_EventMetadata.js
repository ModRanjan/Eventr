import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

const getEventMetadata = async (eventId) => {
  const getEventData = `
      import Eventr1 from 0xEventr

      pub struct EventMetadata {
        pub let eventID: String
        pub let eventName: String
        pub let description: String?
        pub let passName: String
        pub let passType: String
        pub let dropType: String
        pub let startTimeStamp: String
        pub let endTimeStamp: String
        pub let profileUrl: String?
        pub let coverUrl: String?
        pub let ownerAddress: String
    
        init(
          eventID: String, eventName: String, description: String?,
          passName: String,
          passType: String,
          dropType: String,
          startTimeStamp: String,
          endTimeStamp: String,
          profileUrl: String?,
          coverUrl: String?,
          ownerAddress: String
        ) {
          self.eventID = eventID
          self.eventName = eventName
          self.description = description
          self.passName = passName
          self.passType = passType
          self.dropType = dropType
          self.startTimeStamp = startTimeStamp
          self.endTimeStamp = endTimeStamp
          self.profileUrl = profileUrl
          self.coverUrl = coverUrl
          self.ownerAddress = ownerAddress        
        }
      }
    
      pub fun main(eventID: UInt64): EventMetadata {
      
        let eventMetadata = Eventr1.getEventMetaData(eventID: eventID)
          ?? panic("Could not get data for the specified event ID")
    
        let data: EventMetadata = EventMetadata(eventID: eventMetadata["eventID"]!,
                                  eventName: eventMetadata["eventName"]!,
                                  description: eventMetadata["description"],
                                  passName: eventMetadata["passName"]!,
                                  passType: eventMetadata["passType"]!,
                                  dropType: eventMetadata["dropType"]!,
                                  startTimeStamp: eventMetadata["startTimeStamp"]!,
                                  endTimeStamp: eventMetadata["endTimeStamp"]!,
                                  profileUrl: eventMetadata["profileUrl"],
                                  coverUrl: eventMetadata["coverUrl"],
                                  ownerAddress: eventMetadata["ownerAddress"]!,
                                )
    
        return data
      }
    
    `;

  return fcl.query({
    cadence: `${getEventData}`,
    args: (arg, t) => [arg(eventId.toString(), t.UInt64)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorization: fcl.authz,
    limit: 999,
  });
};

export default getEventMetadata;
