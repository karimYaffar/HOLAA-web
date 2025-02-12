import { Injectable } from "@angular/core";
import { HotToastService, Toast } from "@ngneat/hot-toast";

@Injectable({
  providedIn: 'root'
})
export class ToastifyService {

  constructor(private toast: HotToastService) {}

  onError(errorMessage: string) {
    this.toast.error(errorMessage)
  }

}