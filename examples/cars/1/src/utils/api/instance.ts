import type { AxiosResponse } from 'axios';

import axios from 'axios';
import { toast } from 'vue-sonner';

import type { BaseResponse } from '@/generated/api';

import { BACKEND_URL, LOCAL_STORAGE_KEYS } from '../constants';

export type ApicraftApiResponse<SuccessData, ErrorData = BaseApiError> = (
  | { data: ErrorData; success: false }
  | { data: SuccessData; success: true }
) &
  Omit<AxiosResponse, 'data'>;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  validateStatus: (status) => status >= 200 && status < 599
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use((response) => {
  const success = response.status < 400;

  if (response.status === 401) {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
  }
  if (!success) {
    if ('message' in response.data) {
      toast.error((response.data as BaseApiError).message);
    } else if ('reason' in response.data) {
      toast.error((response.data as BaseResponse).reason!);
    } else toast.error('Something went wrong');
  }

  return { ...response, success };
});
