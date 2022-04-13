import { Company } from "../companyModel";
import { UserDto } from "./userDto";

export interface UserReletionShipDto{
  id:number;
  adminUserName:string;
  adminMail:string;
  adminAddedAt:string;
  adminIsActive:string;
  userUserId:number;
  userUserName:string;
  userMail:string;
  userAddedAt:string;
  userMailValue:string;
  userIsActive:string;
  companies: Company[];
}
