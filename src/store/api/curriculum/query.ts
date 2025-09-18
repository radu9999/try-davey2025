import { HTTP } from "@/constants/httpMethods";
import { modernCommuneApi } from "..";
import {
  GetMemberQuizParams,
  QuizQuestion,
} from "../../../api/modernCommuneApi";

const curriculumGet = modernCommuneApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurriculumQuery: builder.query<
      QuizQuestion[],
      { params?: GetMemberQuizParams }
    >({
      query: ({ params }) => ({
        url: `/member/quiz`,
        method: HTTP.GET,
        params,
      }),
    }),
  }),
});

export const { useGetCurriculumQueryQuery } = curriculumGet;
