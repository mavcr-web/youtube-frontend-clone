import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private roleSubject = new BehaviorSubject<string>('');

  role$ = this.roleSubject.asObservable();

  sendData(data: string) {
    this.roleSubject.next(data);
  }
}
