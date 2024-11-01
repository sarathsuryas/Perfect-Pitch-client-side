import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";
import { userReducer } from "./user.reducer";

export const selectUserState = createFeatureSelector<UserState>('user')

// register User
export const selectUserLoading =  createSelector(
 selectUserState,
 (userState)=> userState.isLoading
)

export const selectUserData = createSelector(
  selectUserState,
  (userState)=> userState.user
)

export const selectUserFail = createSelector(
  selectUserState,
  (userState)=> userState.error
)

// otp verification
export const selectOtpVerificationLoading = createSelector(
  selectUserState,
  (userState) => userState.isLoading
)

export const selectOtpVerificationSuccess = createSelector(
  selectUserState,
  (userState)=> userState.token
)

export const selectOtpVerificationFail = createSelector(
  selectUserState,
  (userState)=> userState.error
)

// login user

export const selectLoginLoading = createSelector(
  selectUserState,
  (userState) => userState.isLoading
)

export const selectLoginSuccess = createSelector(
  selectUserState,
  (userState)=>{
    userState.token,
    userState.user
  }
)

export const selectLoginFail = createSelector(
  selectUserState,
  (userState)=> userState.error
)

// get users

export const selectUsersDataLoading = createSelector(
  selectUserState,
  (userState)=> userState.isLoading
)

export const selectUsersData = createSelector(
  selectUserState,
  (userState)=> userState.users
)

export const selectUsersDataError = createSelector(
  selectUserState,
  (userState)=> userState.error
)

export const selectIsAuthUser = createSelector(
  selectUserState,
  (userState) => !!userState.token
)

export const selectUserId  = createSelector(
  selectUserState,
  (userState)=> userState.userId
)

export const selectIsPremiumUser = createSelector(
  selectUserState,
  (userState)=> userState.user?.premiumUser
)