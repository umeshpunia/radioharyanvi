import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  constructor(
    private httpSer:HttpService
  ) { }


  getNowPlaying(){
    return this.httpSer.getData(`${environment.radioApiUrl}nowplaying`)
  }
}
