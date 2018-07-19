import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Projects } from '../models/projects';
import { Global } from "./global";


@Injectable()
export class ProjectService {
    public url: string;
    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio Angular'
    }

    saveProject(project: Projects){

        let params = JSON.stringify(project);
        let header = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.post(this.url + 'save-project', params, {headers: header});
    }
}
