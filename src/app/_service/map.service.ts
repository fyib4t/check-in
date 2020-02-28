import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http:HttpClient) { }

  addCenterPoint(){
//     insert into centerpoint (ctp_name,ctp_address,ctp_lat,ctp_lng)
//     values ('Royal Thai Mint','13 ตำบล คลองหนึ่ง Khlong Luang District, Pathum Thani 12120',14.0097,100.6170)
  }

  getcenterpoint(){
    return this.http.get<any>(`http://192.168.0.105:9879/v1/users/getcenterpoint`);
  }
}
