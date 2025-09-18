import { API_BASE_URL } from "@/constants/environments";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import JSONBig from "json-bigint";
import qs from "qs";
import { RootState } from "..";
import { logout } from "../slice/memberSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const {
      member: { token },
    } = getState() as RootState;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },

  paramsSerializer: (params) => {
    return qs.stringify(params, {
      arrayFormat: "repeat",
    });
  },

  async responseHandler(response) {
    const result = await response.text();

    if (result) {
      return JSONBig.parse(result);
    }

    return null;
  },
});

const mutex = new Mutex();

const baseQueryWithReauthAndBailOut: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = retry(
  async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    const reauthCondition =
      result?.error?.status === 401 &&
      (result?.error?.data as { title: string })?.title === "Unauthorized";

    if (reauthCondition) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          api.dispatch(logout());
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }

    return result;
  },
  {
    retryCondition: (error) =>
      error.status === 429 || Number(error.status) > 500,
  }
);

export const modernCommuneApi = createApi({
  reducerPath: "modernCommuneApi",
  baseQuery: baseQueryWithReauthAndBailOut,
  endpoints: () => ({}),
});
