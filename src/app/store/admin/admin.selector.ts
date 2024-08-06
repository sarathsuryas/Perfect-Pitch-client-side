import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState } from "./admin.state";

export const selectAdminState = createFeatureSelector<AdminState>('admin')

// login selector 
export const selectLoginLoading = createSelector(
  selectAdminState,
  (adminState) => adminState.isLoading
)

export const selectAdminToken = createSelector(
  selectAdminState,
  (adminState) => adminState.token
)
export const selectIsAuthAdmin = createSelector(
  selectAdminState,
  (state)=> !!state.token
)

export const selectAdminData = createSelector(
  selectAdminState,
  (adminState) => adminState.admin 
)

export const selectAdminLoginError = createSelector(
  selectAdminState,
  (adminState) => adminState.error
)