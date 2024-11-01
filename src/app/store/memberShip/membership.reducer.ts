import { createReducer, on } from '@ngrx/store';
import { setMembershipId } from './membership.action';
import { membershipInitialState } from './membership.state';



export const membershipReducer = createReducer(
  membershipInitialState,
  on(setMembershipId,(state,action)=>({
    ...state,
    memberShipId:action.memberShipId
  }))
);
