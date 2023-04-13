import { AxiosResponse } from 'axios';

export type ApiPromise<T> = Promise<AxiosResponse<T>>;
