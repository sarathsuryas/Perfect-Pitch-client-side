import { createAction, props } from "@ngrx/store";
import { RegisterUserDto } from "src/app/core/dtos/registerUserDto";
import { userModel } from "./user.model";
import { IUserData } from "src/app/core/interfaces/IUserData";
import { IGoogleLoginDto } from "src/app/core/dtos/IGoogleLogin.dto";

    // user registration
export const registerUser = createAction('[User] Register User',props<{userData:RegisterUserDto}>())
export const registerUserSuccess = createAction('[User] Register Success',props<{user:userModel}>())
export const registerUserFail = createAction('[User] Register user Failiure',props<{error:string}>())

  // user otp
export const verifyOtp = createAction('[User] verify Otp',props<{userData:string,otp:string}>())
export const verifyOtpSuccess = createAction('[User] verify Otp Success',props<{userData:IUserData}>())
export const verifyOtpFail = createAction('[User] verify Otp fail',props<{error:string}>())

  // user login
export const loginUser = createAction('[User] login User',props<{email:string,password:string}>())
export const loginUserSuccess = createAction('[User] login user success',props<{userData:IUserData}>())
export const loginUserFail = createAction('[User] login user fail',props<{error:string}>())

// open close sidebar

export const closeSidebar = createAction('[User] close SideBar')

// logout

export const logOut = createAction('[User] logout')


// set token from cookie
export const userSetTokenFromCookie = createAction('[User] set token from cookie',props<{token:string}>())

// googleLoginUser

export const googleLoginUser = createAction('[User] google Login',props<{userData:IGoogleLoginDto}>())
export const googleLoginUserSuccess = createAction('[User] google Login Success',props<{userData:IUserData}>())
export const googleLoginFail = createAction('[User] google Login Fail',props<{error:string}>())
export const removeToken = createAction('[User] Remove Token')

