import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  getData(url: string) {
    return this.http.get(url)
  }

  postData(url:string,data:any) {

    return this.http.post(url,data)
  }

}
