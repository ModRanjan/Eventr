import { FaCheck } from 'react-icons/fa';
import { IconType } from 'react-icons';

export const ProcessTitle = {
  Event: 'Create Event',
  Pass: 'Create Pass',
  PassCategories: 'Set Up Pass Categories',
  Deploy: 'Deploy Event (contract) on mainnet',
};

enum ProcessProgress {
  'NotReached',
  'Blink',
  'Reached',
  'Complete',
}

export interface CreateEventProcessType {
  title: string;
  description: string;
  icon?: IconType;
  progress: number;
  lastStep: boolean;
}

export const EventProgress: CreateEventProcessType[] = [
  {
    title: ProcessTitle.Event,
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, nisi.`,
    icon: FaCheck,
    progress: ProcessProgress.Reached,
    lastStep: false,
  },
  {
    title: ProcessTitle.Pass,
    description: `Test out your contract by mint a pass. Just like minting a
    token on testnet.`,
    progress: ProcessProgress.Blink,
    lastStep: false,
  },
  {
    title: ProcessTitle.PassCategories,
    description: `Specify who should get paid when Pass is sold on secondary
    markets`,
    progress: ProcessProgress.NotReached,
    lastStep: false,
  },
  {
    title: ProcessTitle.Deploy,
    description: `Keep in mind that you will not be able to deit youe Event
    after this step.`,
    progress: ProcessProgress.NotReached,
    lastStep: true,
  },
];
