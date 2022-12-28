import { FaCheck } from 'react-icons/fa';
import { IconType } from 'react-icons';

export interface CreateEventProcessType {
  title: string;
  description: string;
  icon?: IconType;
  progress: 'NotReached' | 'Blink' | 'Complete';
  lastStep: boolean;
}

export const EventProgress: CreateEventProcessType[] = [
  {
    title: 'Create Event',
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, nisi.`,
    icon: FaCheck,
    progress: 'Complete',
    lastStep: false,
  },
  {
    title: 'Create Pass',
    description: `Test out your contract by mint a pass. Just like minting a
    token on testnet.`,
    progress: 'Blink',
    lastStep: false,
  },
  {
    title: 'Deploy Event (contract) on mainnet',
    description: `Keep in mind that you will not be able to deit youe Event
    after this step.`,
    progress: 'NotReached',
    lastStep: false,
  },
  {
    title: 'Set Up Royalties',
    description: `Specify who should get paid when Pass is sold on secondary
    markets`,
    progress: 'NotReached',
    lastStep: true,
  },
];
