import {
  CharityBalance
} from "@/api/modernCommuneApi";
import { HTTP } from "@/constants/httpMethods";
import { modernCommuneApi } from "..";

const charitiesAPI = modernCommuneApi.injectEndpoints({
  endpoints: (builder) => ({
    getCharityBalance: builder.query<CharityBalance, void>({
      query: () => ({
        url: `/member/charity-balance`,
        method: HTTP.GET
      }),
    }),
  }),
});

export const {
  useGetCharityBalanceQuery
} = charitiesAPI;
