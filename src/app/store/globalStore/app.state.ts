import { AdminState } from "../admin/admin.state";
import { UserState } from "../user/user.state";

export interface AppState {
  user:UserState
  admin:AdminState
}