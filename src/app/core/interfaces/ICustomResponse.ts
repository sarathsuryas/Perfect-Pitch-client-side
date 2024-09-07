export interface ICustomResponse extends Response {
  message:string
  success:boolean
  presignedUrl:string
}