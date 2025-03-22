import { computed, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../interfaces/api.response.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  #avatar = signal<string>('');

  avatar = computed(() => this.#avatar());

  protected override endpoint: string = 'users';

  getAvatar(): Observable<IApiResponse> {
    return this.get<IApiResponse>(
      'avatar',
      { withCredentials: true }
    ).pipe(
      tap((response) => {
        if (response.data?.avatar) {
          this.#avatar.set(response.data.avatar);
        }
      })
    );
  }
}
