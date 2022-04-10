import { ResponseModel } from "./reponseModel";

export interface SingleResponseModel<T> extends ResponseModel
{
  data: T;
}
