import axios from '@/services/index';
import { CreatePassCategory, UpdatePassCategory } from 'types/passCategory';

const createPassCategory = async (payload: CreatePassCategory) => {
  const PassCategoryDetail = payload;

  try {
    const response = await axios.post('/passCategory', PassCategoryDetail);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

const updatePassCategory = async (
  passId: number,
  payload: UpdatePassCategory,
) => {
  const Id = passId;
  const PassCategoryDetail = payload;

  try {
    const response = await axios.put(`/passCategory/${Id}`, PassCategoryDetail);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

const deletePassCategory = async (passId: number) => {
  const Id = passId;

  try {
    const response = await axios.delete(`/passCategory/${Id}`);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

const getPassCategories = async (passId: number) => {
  const Id = passId;

  try {
    const response = await axios.get(`/passCategory/${Id}`);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

export {
  createPassCategory,
  updatePassCategory,
  deletePassCategory,
  getPassCategories,
};
