import { ResponseModel } from "./reponseModel";

export interface ListResponseModel<T> extends ResponseModel{
  data: T[];
}
