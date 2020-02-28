import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CenterPoint} from 'src/app/_model/centerpoint';
@Injectable({
  providedIn: 'root'
})
export class CenterpointService {

  constructor(private http: HttpClient) { }

  addcenterpoint(ctp: CenterPoint){
    return this.http.post(`http://192.168.0.105:9879/v1/users/addCheckPoint`, ctp);
  }
}
