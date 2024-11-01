import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MembershipState } from './membership.state';

export const selectMembershipState = createFeatureSelector<MembershipState>('membership');

export const selectMembershipId = createSelector(
  selectMembershipState,
  (state: MembershipState) => state.memberShipId
);
