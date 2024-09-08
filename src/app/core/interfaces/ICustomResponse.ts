export interface ICustomResponse extends Response {
  message:string
  success:boolean
  presignedUrl:{
    url: string;
    uniqueKey: string;
  }
}