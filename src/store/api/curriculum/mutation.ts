import { HTTP } from "@/constants/httpMethods";
import { modernCommuneApi } from "..";
import { QuizQuestion } from "../../../api/modernCommuneApi";

const curriculumDataApi = modernCommuneApi.injectEndpoints({
  endpoints: (builder) => ({
    putCurriculumQuery: builder.mutation<
      QuizQuestion,
      { id: string; quizQuestion: QuizQuestion }
    >({
      query: ({ id, quizQuestion }) => ({
        url: `/member/quiz/${id}`,
        method: HTTP.PUT,
        body: quizQuestion,
      }),
    }),
  }),
});

export const { usePutCurriculumQueryMutation } = curriculumDataApi;
