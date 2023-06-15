import Axios from 'axios';
import { storage } from '../utils/storage';

function authRequestInterceptor(config: any) {
  const token = storage.getToken();
  if (token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.headers.authorization = `${token}`;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    console.log('Error', config, response);

    if (response.status === 401) {
      storage.clearTokens();
    }
  }
);
