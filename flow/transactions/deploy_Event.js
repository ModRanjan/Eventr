import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import { toCadenceDict } from '@/flow/utils/helper';

/**
  * metadata: { 
    "eventID":"1", 
    "eventName": "event_test-1",
    "passName": "pass_test-1", 
    "passType": "ERC1155",
    "dropType": "mint", 
    "description": "event_day celebration (event_test-2)", 
    "startTimeStamp": "", 
    "endTimeStamp": "",
    "coverUrl":"https://bafybeieyvgiwrhc4qafndqpcx3ghgm6m7i7i3wcq2fjjtlflub263n5a54.ipfs.nftstorage.link/", 
    "profileUrl": "https://bafybeieyvgiwrhc4qafndqpcx3ghgm6m7i7i3wcq2fjjtlflub263n5a54.ipfs.nftstorage.link/",
    "ownerAddress": "0x01"
  }
*/

export const deployEventAndCategories = async (
  eventID,
  name,
  passName,
  passType,
  dropType,
  categoryNames,
  prices,
  maxLimits,
  metadata,
) => {
  // create_event create_passCategories and also add them to event
  const Cadence = `
    import Eventr1 from 0xEventr

    transaction(eventID: UInt64, name: String, passName: String, passType: String, dropType: String, categoryNames: [String], prices: [UFix64], maxLimits: [UInt32], metadata:{String: String}) {

      let adminRef: &Eventr1.Admin
      let categoryIDs:[UInt64]

      prepare(signer: AuthAccount) {
        let adminStoragePath = StoragePath(identifier: "EventrAdminEventId".concat(eventID.toString()))
            ?? panic("does not specify a storage path")

        // borrow a reference to the Admin resource in storage
        self.adminRef = signer.borrow<&Eventr1.Admin>(from: adminStoragePath)
            ?? panic("No admin resource in storage")

        self.categoryIDs = []
      }

      execute {
          
        var tempPassType = Eventr1.PassType.erc721
        var tempDropType = Eventr1.DropType.mint
        
        if(passType == Eventr1.passTypeToString(Eventr1.PassType.erc1155)) {
          tempPassType = Eventr1.PassType.erc1155
        }
        if (dropType == Eventr1.dropTypeToString(Eventr1.DropType.premint)){
            tempDropType = Eventr1.DropType.premint
        }

        // Create a Event with the specified name and metadata
        self.adminRef.createEvent(eventID: eventID, name: name, passName: passName, passType: tempPassType, dropType: tempDropType, metadata: metadata)

        for index, categoryName in categoryNames {
          let categoryId = self.adminRef.createPassCategory(eventID: eventID, categoryName: categoryName, price: prices[index], maxLimit: maxLimits[index])

          self.categoryIDs.append(categoryId)
        }

        let eventRef = self.adminRef.borrowEvent(eventID: eventID)

        eventRef.addPassCategories(categoryIDs: self.categoryIDs)

        eventRef.lock()

        log(self.categoryIDs)
      }

      post {
        Eventr1.getEventName(eventID: eventID) == name:
          "Could not find the specified Event"

        Eventr1.getEventMetaData(eventID: eventID) != nil:
          "MetaData doesnt exist with this id"
      }
    }
  `;

  const dict = toCadenceDict(metadata);
  console.log('metadata: ', metadata);
  console.log('passType: ', passType);

  const payload = await fcl.args([
    fcl.arg(eventID.toString(), t.UInt64),
    fcl.arg(name.toString(), t.String),
    fcl.arg(passName.toString(), t.String),
    fcl.arg(passType.toString(), t.String),
    fcl.arg(dropType.toString(), t.String),
    fcl.arg(categoryNames, t.Array(t.String)),
    fcl.arg(prices, t.Array(t.UFix64)),
    fcl.arg(maxLimits, t.Array(t.UInt32)),
    fcl.arg(dict, t.Dictionary({ key: t.String, value: t.String })),
  ]);

  return await fcl.send([
    fcl.transaction(`${Cadence}`),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(999),
    payload,
  ]);
};

const deployEventAndCategory = async (
  eventID,
  name,
  passName,
  passType,
  dropType,
  categoryName,
  price,
  maxLimit,
  metadata,
) => {
  const CreateEvent = `
      // create_event

      import Eventr1 from 0xEventr

      // This transaction is for the admin to create a new event resource
      // and store it in the Eventr smart contract
      //
      // Parameters: 
      //      eventID: 
      //      eventName: the name of a new Event to be created
      //      passType: ERC721 | ERC1155
      //      dropType: MINT | PRE-MINT | CLAIM
      //      categoryName: String
      //      price: UFix64
      //      maxLimit: UInt32
      //      metadata: A dictionary of all the event metadata associated
      //
      transaction(eventID: UInt64, eventName: String, passName: String, passType: String, dropType: String, categoryName: String, price: UFix64, maxLimit: UInt32, metadata:{String: String}) {

        let adminRef: &Eventr1.Admin

        prepare(signer: AuthAccount) {
          let adminStoragePath = StoragePath(identifier: "EventrAdminEventId".concat(eventID.toString()))
              ?? panic("does not specify a storage path")
  
          // borrow a reference to the Admin resource in storage
          self.adminRef = signer.borrow<&Eventr1.Admin>(from: adminStoragePath)
              ?? panic("No admin resource in storage")
        }

        execute {

          var tempPassType = Eventr1.PassType.erc721
          var tempDropType = Eventr1.DropType.mint
          
          if(passType == Eventr1.passTypeToString(Eventr1.PassType.erc1155)) {
            tempPassType = Eventr1.PassType.erc1155
          }
          if (dropType == Eventr1.dropTypeToString(Eventr1.DropType.premint)){
            tempDropType = Eventr1.DropType.premint
          }

          // Create a set with the specified name
          self.adminRef.createEvent(eventID: eventID, name: eventName, passName: passName, passType: tempPassType, dropType: tempDropType, metadata: metadata)

          let categoryId = self.adminRef.createPassCategory(eventID: eventID, categoryName: categoryName, price: price, maxLimit: maxLimit)
        }

        post {
          Eventr1.getEventName(eventID: eventID) == eventName:
            "Could not find the specified set"

          Eventr1.getEventMetaData(eventID: eventID) != nil:
              "eventID doesnt exist"
        }
      }
  `;

  const dict = toCadenceDict(metadata);
  console.log('metadata: ', dict);

  const payload = await fcl.args([
    fcl.arg(eventID.toString(), t.UInt64),
    fcl.arg(name.toString(), t.String),
    fcl.arg(passName.toString(), t.String),
    fcl.arg(passType.toString(), t.String),
    fcl.arg(dropType.toString(), t.String),
    fcl.arg(categoryName.toString(), t.String),
    fcl.arg(price.toString(), t.UFix64),
    fcl.arg(maxLimit.toString(), t.UInt32),
    fcl.arg(dict, t.Dictionary({ key: t.String, value: t.String })),
  ]);

  return await fcl.send([
    fcl.transaction(`${CreateEvent}`),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(999),
    payload,
  ]);
};

export default deployEventAndCategory;
