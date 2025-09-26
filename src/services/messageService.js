import axios from 'axios';

const API_URL = 'http://ec2-98-84-125-166.compute-1.amazonaws.com:8081/api/messages';

export const getMessages = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createMessage = async (message) => {
  const response = await axios.post(API_URL, message);
  return response.data;
};
