export interface IUserData {
  userData:{
    _id:string
    email: string
    fullName: string
    isAdmin: boolean
    isBlocked: boolean
};
  token:string;
}