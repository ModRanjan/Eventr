import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  ProcessData,
  PurchaseProgress,
  ProgressType,
  DeploymentProgress,
} from './types';

export interface ProcessState {
  DeploymentProcess: ProcessData[];
  PurchaseProcess: ProcessData[];
}

const initialState: ProcessState = {
  DeploymentProcess: DeploymentProgress,
  PurchaseProcess: PurchaseProgress,
};

const procesesSlice = createSlice({
  name: 'Proceseses',
  initialState,
  reducers: {
    setPurchaseProcess(state, action: PayloadAction<ProgressType | null>) {
      const payload = action.payload;

      if (payload === 'SetupAccount') {
        return {
          ...state,
          PurchaseProcess: state.PurchaseProcess.map((item) =>
            item.title === 'Set-up Account'
              ? { ...item, progress: 2 }
              : item.title === 'Purchase Token'
              ? { ...item, progress: 1 }
              : item,
          ),
        };
      } else if (payload === 'Purchase') {
        return {
          ...state,
          PurchaseProcess: state.PurchaseProcess.map((item) =>
            item.title === 'Purchase Token'
              ? { ...item, progress: 2 }
              : item.title === 'Set-up Account'
              ? { ...item, progress: 2 }
              : item,
          ),
        };
      }

      return state;
    },
    setDeploymentProcess(state, action: PayloadAction<ProgressType | null>) {
      const payload = action.payload;

      if (payload === 'SetupAccount') {
        return {
          ...state,
          DeploymentProcess: state.DeploymentProcess.map((item) =>
            item.title === 'Set-up Account'
              ? { ...item, progress: 2 }
              : item.title === 'Deploy'
              ? { ...item, progress: 1 }
              : item,
          ),
        };
      } else if (payload === 'Deploy') {
        return {
          ...state,
          DeploymentProcess: state.DeploymentProcess.map((item) =>
            item.title === 'Deploy'
              ? { ...item, progress: 2 }
              : item.title === 'Set-up Account'
              ? { ...item, progress: 2 }
              : item,
          ),
        };
      }

      return state;
    },
    reSetProcessState(state) {
      return { ...state, DeploymentProgress, PurchaseProgress };
    },
  },
});

export const { setPurchaseProcess, setDeploymentProcess, reSetProcessState } =
  procesesSlice.actions;
export default procesesSlice.reducer;
