import { createAction, props } from "@ngrx/store";
import { RegisterUserDto } from "src/app/core/dtos/registerUserDto";
import { userModel } from "./user.model";

    // user registration
export const registerUser = createAction('[User] Register User',props<{userData:RegisterUserDto}>())
export const registerUserSuccess = createAction('[User] Register Success',props<{user:userModel}>())
export const registerUserFail = createAction('[User] Register user Failiure',props<{error:string}>())

  // user otp
export const verifyOtp = createAction('[User] verify Otp',props<{userData:string,otp:string}>())
export const verifyOtpSuccess = createAction('[User] verify Otp Success',props<{token:string}>())
export const verifyOtpFail = createAction('[User] verify Otp fail',props<{error:string}>())

  // user login
export const loginUser = createAction('[User] login User',props<{email:string,password:string}>())
export const loginUserSuccess = createAction('[User] login user success',props<{userData:userModel}>())
export const loginUserFail = createAction('[User] login user fail',props<{error:string}>())

