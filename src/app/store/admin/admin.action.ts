import { createAction, props } from "@ngrx/store";
import { AdminModel } from "./admin.model";
import { userModel } from "../user/user.model";
import { AddUserDto } from "src/app/core/dtos/addUser.dto";
import { EditUserDto } from "src/app/core/dtos/editUser.dto";

    //  admin login
export const adminLogin = createAction('[Admin] adminLogin',props<{email:string,password:string}>())
export const adminLoginSuccess = createAction
('[Admin] adminLoginSuccess',props<{adminData:AdminModel,token:string}>())
export const adminLoginFail = createAction('[Admin] adminLoginFail',props<{error:string}>())

// get Users
export const getUsers = createAction('[Admin] getUsers')
export const getUsersSuccess = createAction('[Admin] getUserSuccess',props<{users:userModel[]}>())
export const getUsersFail = createAction('[Admin] getUsersFail',props<{error:string}>())

// block User
export const blockUser = createAction('[Admin] block user',props<{email:string}>())
export const blockUserSuccess = createAction('[Admin] block user success',props<{users:userModel[]}>())
export const blockUserFail = createAction('[Admin] blockUserfail',props<{error:string}>())

// add User
export const addUser = createAction('[Admin] add user',props<{userData:AddUserDto}>())
export const addUserSuccess = createAction('[Admin] add user success',props<{users:userModel[]}>())
export const addUserFail = createAction('[Admin] add user fail',props<{error:string}>())

// edit user
export const editUser = createAction('[Admin] edit user',props<{userData:EditUserDto}>())
export const editUserSuccess = createAction('[Admin] edit user scuccess',props<{users:userModel[]}>())
export const editUserFail = createAction('[Admin] edit user fail',props<{error:string}>())

// logout

export const adminLogout = createAction('[Admin] logout Admin')
export const removeToken = createAction('[Admin] remove Token')

// set token from cookie
export const setAdminTokenCookie = createAction("[Admin] Set Token From Cookie")
export const setTokenAdmin = createAction('[Admin] set token',props<{token:string}>())
export const searchUser = createAction('[Admin] search user',props<{search:string}>())



