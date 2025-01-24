import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";

export abstract class BaseService {
    protected readonly SERVER = environment.BASE_URL;

    protected abstract httpOptions:{}

    constructor(protected readonly httpClient: HttpClient) {}
    
    

}