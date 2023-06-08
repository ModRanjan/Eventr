import { FaCheck } from 'react-icons/fa';
import { IconType } from 'react-icons';

enum ProcessProgress {
  'NotReached',
  'Reached', // 'Blink',
  'Complete',
}

export interface ProcessData {
  title: string;
  description: string;
  icon?: IconType;
  progress: number;
  lastStep: boolean;
}

export const PurchaseProcessTitle = {
  SetupAccount: 'Set-up Account',
  Purchase: 'Purchase Token',
};

export const DeploymentProcessTitle = {
  SetupAccount: 'Set-up Account',
  Deploy: 'Deploy',
};

export type ProgressType =
  | keyof typeof PurchaseProcessTitle
  | keyof typeof DeploymentProcessTitle;

export const PurchaseProgress: ProcessData[] = [
  {
    title: PurchaseProcessTitle.SetupAccount,
    description: `Setup Eventr Collection your account to store tokens.`,
    progress: ProcessProgress.Reached,
    lastStep: false,
  },
  {
    title: PurchaseProcessTitle.Purchase,
    description: `Purchasing means: Token will be stored in your Account.`,
    progress: ProcessProgress.NotReached,
    lastStep: true,
  },
];

export const DeploymentProgress: ProcessData[] = [
  {
    title: DeploymentProcessTitle.SetupAccount,
    description: `Setup all remaining things like Collections and admin in your account.`,
    progress: ProcessProgress.Reached,
    lastStep: false,
  },
  {
    title: DeploymentProcessTitle.Deploy,
    description: `Deploy Event on testnet`,
    progress: ProcessProgress.NotReached,
    lastStep: true,
  },
];
