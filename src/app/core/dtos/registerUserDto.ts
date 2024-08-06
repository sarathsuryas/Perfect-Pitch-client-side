export interface RegisterUserDto {
  fullName:string;
  email:string;
  phone:number;
  password:string;
  otp?:string
}