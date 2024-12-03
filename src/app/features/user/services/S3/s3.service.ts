import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  constructor(private _http:HttpClient) { }

  uploadSingleFileToS3(fileuploadurl: string, contenttype: string, file: File) {
    const headers = new HttpHeaders({ 'Content-Type': contenttype });
    const req = new HttpRequest(
      'PUT',
      fileuploadurl,
      file,
      {
        headers: headers
      });
    return this._http.request(req)
  }

  uploadMultipleFileToS3(files: { url: string, contenttype: string, file: File }[]) {
    const multipleRequest = files.map(({ url, contenttype, file }) => {
      return this.uploadSingleFileToS3(url, contenttype, file)
    })
    return forkJoin(multipleRequest)
  }
                  
}                  
  