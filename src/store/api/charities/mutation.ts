import { HTTP } from "@/constants/httpMethods";
import { modernCommuneApi } from "..";

const charitiesAPI = modernCommuneApi.injectEndpoints({
  endpoints: (builder) => ({
    donate: builder.mutation<void, { donateInfo: any }>({
      query({ donateInfo }) {
        return {
          url: `/member/charity-donate`,
          method: HTTP.POST,
          body: donateInfo,
        };
      },
    }),
  }),
});

export const {
  useDonateMutation
} = charitiesAPI;
