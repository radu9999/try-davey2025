export interface MemberQuestionsCard {
  dateAnswered?: string | null;
  status?: string | null;
  questionId?: string | null;
  questionText?: string | null;
  memberAnswer?: string | null;
  correctAnswer?: string | null;
  dateDisputed?: string | null;
  disputedComment?: string | null;
  dateResolved?: string | null;
  resolvedComment?: string | null;
  rewardDescription?: string | null;
  id?: number;
}

export interface MemberQuestionsTypes {
  filter?: string | null;
  items?: MemberQuestionsCard[] | null;
  page?: number;
  pageCount?: number;
  perPage?: number;
  resultCount?: number;
}
