import { Component, OnInit } from '@angular/core';
import { Projects } from "../../models/projects";
import { ProjectService } from '../../services/project.service';
import { Global } from "../../services/global";

@Component({
	selector: "app-projects",
	templateUrl: "./projects.component.html",
	styleUrls: ["./projects.component.css"],
	providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
	public projects: Projects[];
	public url: string;
	constructor(
		private _projectService: ProjectService
	) {
		this.url = Global.url;
	}

	ngOnInit() {
		this.getProjects();
	}

	getProjects(){
	    this._projectService.getProjects().subscribe(
	      response =>{
	        this.projects = response.projects;
	        console.log(response);
	      },
	      error =>{
	        console.log(<any>error);
	      }
	    );
	}
}
