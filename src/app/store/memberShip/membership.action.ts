import { createAction, props } from '@ngrx/store';

export const setMembershipId = createAction(
  '[Membership] Set Membership ID',
  props<{ memberShipId: string }>()
);
