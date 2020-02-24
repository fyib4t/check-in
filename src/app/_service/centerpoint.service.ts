import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CenterPoint} from 'src/app/_model/centerpoint';
@Injectable({
  providedIn: 'root'
})
export class CenterpointService {

  constructor(private http: HttpClient) { }

  addcenterpoint(ctp: CenterPoint){
    return this.http.post(`http://localhost:9879/v1/users/addCheckPoint`, ctp);
  }
}
