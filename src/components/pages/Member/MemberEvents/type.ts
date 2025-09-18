export interface MemberEventsCard {
  date?: string | null;
  type?: string | null;
  description?: string | null;
  id?: number;
}

export interface MemberEventsTypes {
  filter?: string | null;
  items?: MemberEventsCard[] | null;
  page?: number;
  pageCount?: number;
  perPage?: number;
  resultCount?: number;
}
