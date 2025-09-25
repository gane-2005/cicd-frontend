import axios from 'axios';

const API_URL = 'http://ec2-54-160-225-155.compute-1.amazonaws.com:8081/api/deals';

export const getDeals = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createDeal = async (deal) => {
  const response = await axios.post(API_URL, deal);
  return response.data;
};

export const updateDeal = async (id, deal) => {
  const response = await axios.put(`${API_URL}/${id}`, deal);
  return response.data;
};

export const deleteDeal = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
