import { createReducer, on } from "@ngrx/store";
import { loginUser, loginUserFail, loginUserSuccess, logOut, registerUser, registerUserFail, registerUserSuccess, removeToken, userSetTokenFromCookie, verifyOtp, verifyOtpFail, verifyOtpSuccess } from "./user.action";
import { initialState } from "./user.state";
import { addUser, addUserFail, addUserSuccess, blockUser, blockUserFail, blockUserSuccess, editUser, editUserFail, editUserSuccess, getUsers, getUsersFail, getUsersSuccess, searchUser } from "../admin/admin.action";

export const userReducer = createReducer(
  initialState,
  on(registerUser,(state)=>({
    ...state,
    isLoading:true,
    error:null
  })),
  on(registerUserSuccess,(state,action)=>({
    ...state,
    user:action.user,
    isLoading:false,
    error:''
  })),
  on(registerUserFail,(state,{error})=>({
    ...state,
    isLoading:false,
    error
  })),
  on(verifyOtp,(state)=>({
    ...state,
    isLoading:true,
    error:null
  })),
 on(verifyOtpSuccess,(state,action)=>({
    ...state,
    isLoading:false,
    user:action.userData,
    token:action.userData.token
 })),
 on(verifyOtpFail,(state,error)=>({
    ...state,
    isLoading:false,
    error:error.error
 })),
 on(loginUser,(state)=>({
  ...state,
  isLoading:true,
  error:null
 })),
 on(loginUserSuccess,(state,user)=>({
  ...state,
  user:user.userData,
  isLoading:false,
  token:user.userData.token,
  error:null
 })),
 on(loginUserFail,(state,error)=>({
  ...state,
  isLoading:false,
  error:error.error
 })),

 // get Users 
on(getUsers,(state)=>({
  ...state,
  isLoading:false,
  error:null
})),
on(getUsersSuccess,(state,action)=>({
  ...state,
  isLoading:false,
  users:action.users,
  error:null
})),
on(getUsersFail,(state,{error})=>({
  ...state,
  isLoading:false,
  error
})),
// block user
on(blockUser,(state)=>({
  ...state,
  isLoading:true,
  error:null
})),
on(blockUserSuccess,(state,action)=>({
  ...state,
  isLoading:false,
  users:action.users,
  error:null
})),
on(blockUserFail,(state,{error})=>({
  ...state,
  isLoading:false,
  error
})),
  // add user
 on(addUser,(state)=>({
  ...state,
  isLoading:true,
  error:null
 })),
 on(addUserSuccess,(state,action)=>({
  ...state,
  users:action.users,
  isLoading:false,
  error:null
 })),
 on(addUserFail,(state,{error})=>({
  ...state,
  isLoading:false,
  error
 })),
 // edit user  
 on(editUser,(state)=>({
  ...state,
  isLoading:true,
  error:null
 })),
 on(editUserSuccess,(state,action)=>({
  ...state,
  users:action.users,
  isLoading:true,
  error:null
 })),
 on(editUserFail,(state,{error})=>({
  ...state,
  isLoading:false,
  error
 })),
 on(searchUser,(state,action)=>({
   ...state,
 })),
 on(userSetTokenFromCookie,(state,action)=>({
  ...state,
  token:action.token
 })),
 on(logOut,(state)=>({
  ...state,
  token:null
 })),
 on(removeToken,(state)=>({
  ...state,
  token:null
 }))
)