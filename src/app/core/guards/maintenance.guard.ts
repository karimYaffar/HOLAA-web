import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map } from "rxjs";
import { ServerService } from "../providers/server.service";

export const maintenanceGuard: CanActivateFn = (route, state) => {
  const server = inject(ServerService);
  const router = inject(Router);

  return true;
  
  // return server.isServerAvailable.pipe(
  //   map(isAvailable => {
  //     if (isAvailable) {
  //       router.navigateByUrl('/', { replaceUrl: true })
  //       return false;
  //     }
  //     return true;
  //   })
  // )
  
}