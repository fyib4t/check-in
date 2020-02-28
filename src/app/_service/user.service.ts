import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from 'src/app/_model/users';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

getAll() {
    return this.http.get<User[]>(`http://192.168.0.105:9879/v1/users/all_data`);
}

register(user: User) {
    return this.http.post(`http://192.168.0.105:9879/v1/users/add_data`, user);
}

delete(id: number) {
    return this.http.delete(`http://192.168.0.105:9879/v1/users/del_data/${id}`);
}
}
