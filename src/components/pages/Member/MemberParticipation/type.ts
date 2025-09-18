export interface MemberParticipationCard {
  date?: string | null;
  type?: string | null;
  description?: string | null;
  amount?: string | null;
  id?: number;
}

export interface MemberParticipationTypes {
  filter?: string | null;
  items?: MemberParticipationCard[] | null;
  page?: number;
  pageCount?: number;
  perPage?: number;
  resultCount?: number;
}
