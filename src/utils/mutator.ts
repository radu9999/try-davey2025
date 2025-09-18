import { API_BASE_URL } from "@/constants/environments";
import qs from "qs";

const baseURL = API_BASE_URL;

export const mutator = async <T>({
  url,
  method,
  params,
  data,
  headers,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: unknown;
  data?: unknown;
  headers?: HeadersInit;
}): Promise<T> => {
  const response = await fetch(
    `${baseURL}${url}` +
      qs.stringify(params, { addQueryPrefix: true, arrayFormat: "repeat" }),
    {
      method,
      ...(data ? { body: JSON.stringify(data) } : {}),
      headers,
    }
  );

  return response.json();
};
