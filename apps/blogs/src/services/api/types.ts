export type PayloadCollection<CollectionType = any> = {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
  docs: CollectionType[];
};

export type Blog = {
  title: string;
  slug: string;
  content: string;
  description: string;
  pubDatetime: Date;
  content_html: string;
};
