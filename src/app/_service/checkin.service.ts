import { Injectable } from '@angular/core';
import { CheckIn} from 'src/app/_model/checkin';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor(private http: HttpClient) { }

  savecheckin(checkin: CheckIn){
    return this.http.post(`http://localhost:9879/v1/users/checkin`, checkin);
  }
}
