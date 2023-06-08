import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

const get_passCategories_data = async (eventId) => {
  const Cadence = `
      import Eventr1 from 0xEventr

      pub fun main(eventID: UInt64): [{String: AnyStruct}] {//: [PassCategoryData] 
        let categoriesId = Eventr1.getCategoriesInPass(eventID: eventID) ??
          panic("No categories found! Check your eventId")
          
        var currentTokensMinted: UInt32 = 0
        var categoryDatas: [{String: AnyStruct}] = []

        for categoryId in categoriesId {
          let currentTokenCount = Eventr1.getNumTokensInPassCategory(eventID: eventID, categoryID: categoryId) ??
            panic("Could not find the specified edition")

          let categoryData = Eventr1.getPassCategoryData(categoryID: categoryId) ??
            panic("Could not find the specified edition")
              
          currentTokensMinted = currentTokensMinted + currentTokenCount

          let tempCategoryData = {"categoryID": categoryData.categoryID,
              "categoryName": categoryData.categoryName,
              "eventID": categoryData.eventID,
              "price": categoryData.price,
              "maxEditions": categoryData.maxEditions,
              "currentCount": currentTokensMinted
            }

          log(tempCategoryData)
          categoryDatas.append(tempCategoryData)
        }

        return categoryDatas
      }
    `;

  return fcl.query({
    cadence: `${Cadence}`,
    args: (arg, t) => [arg(eventId.toString(), t.UInt64)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorization: fcl.authz,
    limit: 999,
  });
};

export default get_passCategories_data;
