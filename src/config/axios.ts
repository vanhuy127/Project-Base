import axios, { AxiosError, AxiosInstance, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { toast } from 'sonner';

import { END_POINT, LOCAL_STORAGE_KEY, SYSTEM_ERROR } from '@/constants';
import { IResponse } from '@/types';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils';

import { envConfig } from './env';

let refreshTokenPromise: Promise<void> | null = null;

const createAxiosInstance = (
  baseURL: string,
  configs: CreateAxiosDefaults = {
    timeout: 15000,
    timeoutErrorMessage: SYSTEM_ERROR.TIMEOUT_ERROR.MESSAGE,
  },
): AxiosInstance => {
  const instance = axios.create({ baseURL, ...configs });

  // Request Interceptor
  instance.interceptors.request.use(
    (config) => {
      const token = getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Disable cache
      config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      config.headers['Pragma'] = 'no-cache';
      config.headers['Expires'] = '0';

      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error: AxiosError) => {
      const originalRequest = error.config;

      if (error.code === 'ECONNABORTED' || error.message === SYSTEM_ERROR.TIMEOUT_ERROR.MESSAGE) {
        toast.error(SYSTEM_ERROR.TIMEOUT_ERROR.MESSAGE);

        return Promise.reject(error);
      }

      if (!error.response) {
        toast.error(SYSTEM_ERROR.NETWORK_ERROR.MESSAGE);

        return Promise.reject(error);
      }

      if (error.response?.status === 410 && originalRequest) {
        if (!refreshTokenPromise) {
          const refreshToken = getLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
          refreshTokenPromise = instance
            .post(END_POINT.AUTH.REFRESH_TOKEN, { refreshToken })
            .then((res) => {
              const { accessToken } = res.data;
              setLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
            })
            .catch((_error) => {
              removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
              removeLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

              return Promise.reject(_error);
            })
            .finally(() => {
              refreshTokenPromise = null;
            });
        }

        return refreshTokenPromise.then(() => instance(originalRequest));
      }

      if (error.response?.status !== 410) {
        if (error.response?.status === 401) {
          removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
          removeLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
        }
        const { error_code } = error.response?.data as IResponse<null>;
        if (error_code) {
          //TODO: Handle specific error codes
          const errorKey = error_code;
          toast.error(errorKey as string);
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

const axiosClient = createAxiosInstance(envConfig.VITE_API_URL);

export { axiosClient };
