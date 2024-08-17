import { createReducer, on } from "@ngrx/store";
import { initialState } from "./admin.state";
import { adminLogin, adminLoginFail, adminLoginSuccess, adminLogout, removeToken, setTokenAdmin } from "./admin.action";


export const adminReducer = createReducer(
  initialState,
  on(adminLogin,(state)=>({
    ...state,
    isLoading:true,
    error:null
  })),
  on(adminLoginSuccess,(state,action)=>({
    ...state,
    isLoading:false,
    admin:action.adminData,
    token:action.token,
    error:null
  })),
  on(adminLoginFail,(state,{error})=>({
    ...state,
    isLoading:false,
    error:error
  })),
  // logout
  on(adminLogout,(state)=>({
    ...state,
    isLoading:true,
    token:null
  })),
  on(setTokenAdmin,(state,action)=>({
    ...state,
    token:action.token
  })),
  on(removeToken,(state)=>({
    ...state,
    token:null
  }))
)