import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";

export abstract class Api {
    protected readonly SERVER = environment.BASE_URL;

    protected readonly httpClient!: HttpClient;

    protected abstract httpOptions:{}


}