import { Injectable } from '@angular/core';
import { CheckIn} from 'src/app/_model/checkin';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor(private http: HttpClient) { }

  savecheckin(checkin: CheckIn){
    return this.http.post(`http://192.168.0.105:9879/v1/users/checkin`, checkin);
  }
}
