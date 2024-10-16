import { userModel } from "./user.model"

export type UserState = {
  user:userModel | null;
  users:userModel[]
  error:string|null
  isLoading:boolean;
  token:string | null
  userId:string
}


export const initialState:UserState = {
  user: null,
  users: [],
  error: '',
  isLoading: false,
  token: null,
  userId: ""
}