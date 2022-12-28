import axios from '@/services/index';

const getUser = async () => {
  try {
    const response = await axios.get('/user/');

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

const updateUser = async (payload) => {
  const updatedDetails = payload;
  console.log('updatedDetails: ', updatedDetails);
  try {
    const response = await axios.put('/user', updatedDetails);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

export { getUser, updateUser };
