export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export type TResponseSuccessType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  meta?: TMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
