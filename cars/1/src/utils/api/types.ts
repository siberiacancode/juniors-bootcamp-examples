import type {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions
} from '@tanstack/vue-query';

declare global {
  export type IsParamsRequired<TFunc extends (...args: any[]) => any> =
    Parameters<TFunc> extends [infer P] ? (undefined extends P ? false : true) : false;

  export interface TanstackVueMutationSettings<TFunc extends (...args: any[]) => Promise<any>> {
    params?: UseMutationOptions<Awaited<ReturnType<TFunc>>, never, Parameters<TFunc>[0], unknown>;
    request?: NonNullable<Parameters<TFunc>[0]>;
  }

  export type TanstackVueQuerySettings<TFunc extends (...args: any[]) => Promise<any>> = {
    params?: Omit<UseQueryOptions<Awaited<ReturnType<TFunc>>, never>, 'queryKey'>;
  } & (IsParamsRequired<TFunc> extends true
    ? { request: NonNullable<Parameters<TFunc>[0]> }
    : { request?: NonNullable<Parameters<TFunc>[0]> });

  export type TanstackVueInfiniteQuerySettings<TFunc extends (...args: any[]) => Promise<any>> = {
    params?: Omit<UseInfiniteQueryOptions<Awaited<ReturnType<TFunc>>, never>, 'queryKey'>;
  } & (IsParamsRequired<TFunc> extends true
    ? { request: NonNullable<Parameters<TFunc>[0]> }
    : { request?: NonNullable<Parameters<TFunc>[0]> });

  export interface BaseApiError {
    error: string;
    message: string;
    statusCode: number;
  }
}
