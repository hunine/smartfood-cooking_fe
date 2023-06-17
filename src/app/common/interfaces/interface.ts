export interface IQuery {
  page?: number;
  limit?: number;
}

export interface IReturnData<Template> {
  data: Template[];
  links: {
    current: string;
  };
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    sortBy?: string[];
  };
}
