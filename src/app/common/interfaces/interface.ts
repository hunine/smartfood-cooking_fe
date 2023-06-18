export interface IQuery {
  page?: number;
  limit?: number;
  filter?: object;
  sortBy?: string;
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
