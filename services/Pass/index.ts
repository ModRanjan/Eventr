import axios from '@/services/index';
import { CreatePass, UpdatePass } from 'types/pass.type';

const createPass = async (payload: CreatePass) => {
  const PassDetail = payload;

  try {
    const response = await axios.post('/Pass/', PassDetail);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

const getPassesByEventId = async (eventId: number) => {
  const Id = eventId;
  try {
    const response = await axios.get(`/pass/${Id}`);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

const updatePass = async (passId: number, payload: UpdatePass) => {
  const Id = passId;
  const PassDetail = payload;

  try {
    const response = await axios.put(`/Pass/${Id}`, PassDetail);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

const deletePass = async (passId: number) => {
  const Id = passId;

  try {
    const response = await axios.delete(`/Pass/${Id}`);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

export { createPass, getPassesByEventId, updatePass, deletePass };
