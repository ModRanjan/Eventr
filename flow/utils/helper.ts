import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import { NFTStorage, File } from 'nft.storage';
import { Pass } from '@/redux/pass/type';
import { Event } from '@/redux/event/types';

const API_KEY: string = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY ?? '';

// Initialize the NFTStorage client
const client = new NFTStorage({ token: API_KEY });

export const toCadenceDict = (item: any) => {
  const eventID = item.eventID.toString();
  const startTimeStamp = new Date(item.startDate).getTime().toString();
  const endTimeStamp = new Date(item.endDate).getTime().toString();

  delete item.eventID;
  delete item.startDate;
  delete item.endDate;

  let newItem = { ...item, eventID, startTimeStamp, endTimeStamp };

  // Return an array of [{key: string, value: string}].
  return Object.keys(newItem).map((k) => ({ key: k, value: newItem[k] }));
};

export const uploadToStorage = async (item: any) => {
  try {
    // const cid = await client.storeBlob(someData);
    const temp = {
      name: item.eventName,
      description: `${item.name}'s metadata`,
      properties: {
        description: `${item.name}'s metadata`,
        type: 'blog-post',
        breed: item.breed,
        age: item.age,
        content: item.file,
      },
      image:
        item.image &&
        new File([item.image], `${item.name}.jpg`, { type: 'image/jpg' }),
    };

    let metadata = await client.store(temp);
    console.log('metadata: ', metadata);

    return metadata;
  } catch (error) {
    console.log(error);
  }
};

export const getDeployArgs = (
  tempEvent: Event,
  tempPass: Pass,
  userAddress: string,
) => {
  const {
    id: eventID,
    title: eventName,
    description,
    startDate,
    endDate,
    Files,
  } = tempEvent;
  const passName = tempPass.title;
  const passType = tempPass?.contractType;
  const dropType = tempPass?.dropType;

  const coverFile = Files?.find((file) => file.type === 'Cover');
  const profileFile = Files?.find((file) => file.type === 'Profile');
  const coverUrl = coverFile?.url || '';
  const profileUrl = profileFile?.url || '';

  return {
    metadata: {
      eventID,
      eventName,
      description,
      coverUrl,
      profileUrl,
      startDate,
      endDate,
      passName,
      passType,
      dropType,
      ownerAddress: userAddress,
    },
  };
};
