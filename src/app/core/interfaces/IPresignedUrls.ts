export interface IPreSignedUrls extends Response {
  message:string
  success:boolean
  presignedUrls:{
    url: string;
    uniqueKey: string;
  }[]
}