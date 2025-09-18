import { UserLogin, UserToken, UserRegister } from "@/api/modernCommuneApi";
import { HTTP } from "@/constants/httpMethods";
import { logout, setMember } from "@/store/slice/memberSlice";
import toast from "react-hot-toast";
import { modernCommuneApi } from "..";
// import { LoginResponse } from "./types";

const memberApi = modernCommuneApi.injectEndpoints({
  endpoints: (builder) => ({
    loginMember: builder.mutation<UserToken, { userLogin: UserLogin }>({
      query({ userLogin }) {
        return {
          url: `/member/login`,
          method: HTTP.POST,
          body: userLogin,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMember(data));
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
    logoutMember: builder.mutation<void, void>({
      query: () => {
        return {
          url: `/member/logout`,
          method: HTTP.POST,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          toast.error("Something went wrong");
        }
      },
    }),
    registerMember: builder.mutation<void, { userRegister: any }>({
      query({ userRegister }) {
        return {
          url: `/member/signup`,
          method: HTTP.POST,
          body: userRegister
        };
      },
    }),
    sendSMS: builder.mutation<void, { userSMS: any }>({
      query({ userSMS }) {
        return {
          url: `/member/sms`,
          method: HTTP.POST,
          body: userSMS,
        };
      },
    }),
    verifySMS: builder.mutation<void, { userSMSVerify: any }>({
      query({ userSMSVerify }) {
        return {
          url: `/member/sms-verify`,
          method: HTTP.POST,
          body: userSMSVerify,
        };
      },
    }),
    checkUser: builder.mutation<void, { userInfo: any }>({
      query({ userInfo }) {
        return {
          url: `/member/usercheck`,
          method: HTTP.POST,
          body: userInfo,
        };
      },
    }),
    
  }),
});

export const { 
  useLoginMemberMutation, 
  useLogoutMemberMutation, 
  useRegisterMemberMutation,
  useSendSMSMutation,
  useVerifySMSMutation,
  useCheckUserMutation
} = memberApi;
