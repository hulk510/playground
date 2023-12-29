export type PayloadCollection<CollectionType = any> = {
  totalDocs?: number;
  limit?: number;
  totalPages?: number;
  page?: number;
  pagingCounter?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: number;
  nextPage?: number;
  hasMore?: boolean;
  docs: CollectionType[];
};

export type Blog = {
  title: string;
  slug: string;
  content: string;
  description: string;
  pubDatetime: Date;
};
