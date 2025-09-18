import {
  BadgeCardListResponse,
  BrandCardListResponse,
  ChallengeCardListResponse,
  CharityCardListResponse,
  CommissionCardList,
  EventCardListResponse,
  GetMemberBadgesParams,
  GetMemberBrandsParams,
  GetMemberChallengesParams,
  GetMemberCharitiesParams,
  GetMemberCommissionParams,
  GetMemberEventsParams,
  GetMemberLevelsParams,
  GetMemberNotificationsParams,
  GetMemberPointsParams,
  GetMemberQuestionsParams,
  InventoryCardListResponse,
  LevelCardListResponse,
  MemberNotificationListResponse,
  MemberProfile,
  PointCardList,
  QuestionCardListResponse,
  BoardCardListResponse,
  GetMemberBoardRoomsParams,
  LevelCard,
  CommissionBalance,
  PendingCommission,
  SalesInfo,
  AwardCard,
  Curriculum,
  LeaderBoardParams,
  LeaderBoard
} from "@/api/modernCommuneApi";
import { GetMemberInventoryParams } from "@/components/pages/Member/MemberInventory";
import { MemberNotificationModifiedTypes } from "@/components/pages/Member/MemberNotification/type";
import { HTTP } from "@/constants/httpMethods";
import { modernCommuneApi } from "..";

const memberDataAPi = modernCommuneApi.injectEndpoints({
  endpoints: (builder) => ({
    getMemberCharities: builder.query<
      CharityCardListResponse,
      GetMemberCharitiesParams
    >({
      query: (params) => ({
        url: `/member/charities`,
        method: HTTP.GET,
        params,
      }),
    }),
    getMemberBrands: builder.query<
      BrandCardListResponse,
      GetMemberBrandsParams
    >({
      query: (params) => ({
        url: `/member/brands`,
        method: HTTP.GET,
        params,
      }),
    }),
    getMemberProfile: builder.query<MemberProfile, void>({
      query: () => ({
        url: `/member/profile`,
        method: HTTP.GET,
      }),
    }),
    getMemberBadges: builder.query<
      BadgeCardListResponse,
      GetMemberBadgesParams
    >({
      query: (params) => ({
        url: `/member/badges`,
        method: HTTP.GET,
        params: params,
      }),
    }),
    getMemberChallenges: builder.query<
      ChallengeCardListResponse,
      GetMemberChallengesParams
    >({
      query: (params) => ({
        url: `/member/challenges`,
        method: HTTP.GET,
        params: params,
      }),
    }),
    getMemberCommission: builder.query<
      CommissionCardList,
      GetMemberCommissionParams
    >({
      query: (params) => ({
        url: `/member/commission`,
        method: HTTP.GET,
        params: params,
      }),
    }),
    getMemberExperience: builder.query<PointCardList, GetMemberPointsParams>({
      query: (params) => ({
        url: `/member/points?type=Experience`,
        method: HTTP.GET,
        params: params,
      }),
    }),
    getMemberParticipation: builder.query<PointCardList, GetMemberPointsParams>(
      {
        query: (params) => ({
          url: `/member/points?type=participation`,
          method: HTTP.GET,
          params: params,
        }),
      }
    ),
    getMemberInventory: builder.query<
      InventoryCardListResponse,
      GetMemberInventoryParams
    >({
      query: (params) => ({
        url: `/member/inventory`,
        method: HTTP.GET,
        params: params,
      }),
    }),
    getMemberLevels: builder.query<
      LevelCardListResponse,
      GetMemberLevelsParams
    >({
      query: (params) => ({
        url: `/member/levels`,
        method: HTTP.GET,
        params: params,
      }),
    }),
    getMemberEvents: builder.query<
      EventCardListResponse,
      GetMemberEventsParams
    >({
      query: (params) => ({
        url: `/member/events`,
        method: HTTP.GET,
        params: params,
      }),
    }),
    getMemberQuestions: builder.query<
      QuestionCardListResponse,
      GetMemberQuestionsParams
    >({
      query: (params) => ({
        url: `/member/questions`,
        method: HTTP.GET,
        params: params,
      }),
    }),
    getMemberNotifications: builder.query<
      MemberNotificationListResponse,
      GetMemberNotificationsParams
    >({
      query: (params) => ({
        url: `/member/notifications`,
        method: HTTP.GET,
        params: params,
      }),
      // transformResponse: (response: MemberNotificationListResponse) => {
      //   const converted = response.items?.map((item) => {
      //     return {
      //       ...item,
      //       id: BigInt(item.id!).toString(),
      //       memberId: BigInt(item.memberId!).toString(),
      //     };
      //   });

      //   return {
      //     ...response,
      //     items: converted,
      //   } as MemberNotificationListResponse;
      // },
    }),
    getMemberNotificationById: builder.query<
      MemberNotificationModifiedTypes,
      { notificationId: string }
    >({
      query: ({ notificationId }) => ({
        url: `/member/notifications/${notificationId}`,
        method: HTTP.GET,
      }),
      // transformResponse: (response: MemberNotificationModifiedTypes) => {
      //   const convertedId = BigInt(response.id!).toString();
      //   const convertedMemberId = BigInt(response.memberId!).toString();

      //   return {
      //     ...response,
      //     id: convertedId,
      //     memberId: convertedMemberId,
      //   } as MemberNotificationModifiedTypes;
      // },
    }),

    getMemberNotificationsIsRead: builder.query<
      MemberNotificationListResponse,
      GetMemberNotificationsParams
    >({
      query: () => ({
        url: `/member/notifications?IsRead=false`,
        method: HTTP.GET,
      }),
    }),

    // getMemberExperienceExport: builder.query<
    //   ExperienceCardListResponse,
    //   void
    // >({
    //   query: () => ({
    //     url: `/member/points/export?type=experience`,
    //     method: HTTP.GET,
    //   }),
    // }),

    getMemberCommissionExport: builder.query<
      CommissionCardList,
      { memberId: string }
    >({
      query: ({ memberId }) => ({
        url: `/member/commission/export`,
        method: HTTP.GET,
        params: { memberId },
      }),
    }),

    getMemberExperienceExport: builder.query<
      PointCardList,
      { memberId: string }
    >({
      query: ({ memberId }) => ({
        url: `/moderncommune/member/points/export?type=experience`,
        method: HTTP.GET,
        params: { memberId },
      }),
    }),

    getMemberParticipationExport: builder.query<
      PointCardList,
      { memberId: string }
    >({
      query: ({ memberId }) => ({
        url: `/member/points/export?type=participation`,
        method: HTTP.GET,
        params: { memberId },
      }),
    }),

    getMemberBoardRooms: builder.query<
      BoardCardListResponse,
      GetMemberBoardRoomsParams
    >({
      query: (params) => ({
        url: `/member/videolinks`,
        method: HTTP.GET,
        params,
      }),
    }),
    getMemberLevel: builder.query<LevelCard, void>({
      query: () => ({
        url: `/member/level`,
        method: HTTP.GET
      }),
    }),
    getCommissionBalance: builder.query<CommissionBalance, void>({
      query: () => ({
        url: `/member/commission-balance`,
        method: HTTP.GET
      }),
    }),
    getPendingCommission: builder.query<PendingCommission, void>({
      query: () => ({
        url: `/member/pending-commission`,
        method: HTTP.GET
      }),
    }),
    getMemberNextLevel: builder.query<LevelCard, void>({
      query: () => ({
        url: `/member/next-level`,
        method: HTTP.GET
      }),
    }),
    getMemberSalesRank: builder.query<SalesInfo, void>({
      query: () => ({
        url: `/member/sales-info`,
        method: HTTP.GET
      }),
    }),
    getMemberBadge: builder.query<AwardCard[], void>({
      query: () => ({
        url: `/member/badge`,
        method: HTTP.GET
      }),
    }),
    getMemberChallenge: builder.query<AwardCard[], void>({
      query: () => ({
        url: `/member/challenge`,
        method: HTTP.GET
      }),
    }),
    getMemberCurriculum: builder.query<Curriculum, void>({
      query: () => ({
        url: `/member/curriculum`,
        method: HTTP.GET
      }),
    }),
    getMemberLeaderBoard: builder.query<LeaderBoard[], LeaderBoardParams>({
      query: (params) => ({
        url: `/member/leader-board`,
        method: HTTP.GET,
        params: params,
      }),
    })
  }),
});

export const {
  useGetMemberCharitiesQuery,
  useGetMemberBrandsQuery,
  useGetMemberProfileQuery,
  useGetMemberBadgesQuery,
  useGetMemberChallengesQuery,
  useGetMemberCommissionQuery,
  useGetMemberExperienceQuery,
  useGetMemberLevelsQuery,
  useGetMemberInventoryQuery,
  useGetMemberParticipationQuery,
  useGetMemberEventsQuery,
  useGetMemberQuestionsQuery,
  useGetMemberNotificationsQuery,
  useGetMemberNotificationByIdQuery,
  useLazyGetMemberNotificationByIdQuery,
  useGetMemberNotificationsIsReadQuery,
  useGetMemberCommissionExportQuery,
  useLazyGetMemberCommissionExportQuery,
  useLazyGetMemberExperienceExportQuery,
  useLazyGetMemberParticipationExportQuery,
  useGetMemberBoardRoomsQuery,
  useGetMemberLevelQuery,
  useGetCommissionBalanceQuery,
  useGetPendingCommissionQuery,
  useGetMemberNextLevelQuery,
  useGetMemberSalesRankQuery,
  useGetMemberBadgeQuery,
  useGetMemberChallengeQuery,
  useGetMemberCurriculumQuery,
  useGetMemberLeaderBoardQuery
} = memberDataAPi;
