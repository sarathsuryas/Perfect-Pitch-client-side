import { userModel } from "../user/user.model";
import { AdminModel } from "./admin.model";

export type AdminState = {
  admin:AdminModel | null;
  admins:AdminModel[],
  error:string|null
  isLoading:boolean;
  token:string | null
}


export const initialState:AdminState = {
  admin: null,
  admins: [],
  error: '',
  isLoading: false,
  token: null
}