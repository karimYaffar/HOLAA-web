import { Injectable } from "@angular/core";
import { ProgressAnimationType, ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private timer: number = 3000;
  private progressBar: boolean = true;
  private progressBarAnimation: ProgressAnimationType = "decreasing";

  constructor(private readonly toastrService: ToastrService) {}

  success(title: string, message: string) {
    return this.toastrService.success(message, title, {
      timeOut: this.timer,
      progressBar: this.progressBar,
      progressAnimation: this.progressBarAnimation,
    });
  }

  error(title: string, message: string) {
    return this.toastrService.error(message, title, {
      timeOut: this.timer,
      progressBar: this.progressBar,
      progressAnimation: this.progressBarAnimation,
    });
  }

  warning(title: string, message: string) {
    return this.toastrService.warning(message, title, {
      timeOut: this.timer,
      progressBar: this.progressBar,
      progressAnimation: this.progressBarAnimation,
    });
  }

  info(title: string, message: string) {
    return this.toastrService.info(message, title, {
      timeOut: this.timer,
      progressBar: this.progressBar,
      progressAnimation: this.progressBarAnimation,
    });
  }
}