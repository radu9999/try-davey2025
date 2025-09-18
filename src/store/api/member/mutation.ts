import { MemberNotification, MemberProfile } from "@/api/modernCommuneApi";
import { HTTP } from "@/constants/httpMethods";
import { modernCommuneApi } from "..";

const memberDataAPi = modernCommuneApi.injectEndpoints({
  endpoints: (builder) => ({
    putMemberProfile: builder.mutation<
      MemberProfile,
      {
        memberProfile: MemberProfile;
      }
    >({
      query: ({ memberProfile }) => ({
        url: `/member/profile`,
        method: HTTP.PUT,
        body: memberProfile,
      }),
    }),

    putMemberNotificationsById: builder.mutation<
      MemberNotification,
      {
        id: string;
        notification: MemberNotification;
      }
    >({
      query: ({ id, notification }) => ({
        url: `/member/notifications/${id}`,
        method: HTTP.PUT,
        body: notification,
      }),
    }),

    deleteMemberNotificationsById: builder.mutation<
      MemberNotification,
      {
        id: string;
      }
    >({
      query: ({ id }) => ({
        url: `/member/notifications/${id}`,
        method: HTTP.DELETE,
      }),
    }),

    createCoupon: builder.mutation<void, { payload: any }>({
      query({ payload }) {
        return {
          url: `/member/create-coupon`,
          method: HTTP.POST,
          body: payload,
        };
      },
    }),
  }),
});

export const {
  usePutMemberProfileMutation,
  usePutMemberNotificationsByIdMutation,
  useDeleteMemberNotificationsByIdMutation,
  useCreateCouponMutation
} = memberDataAPi;
