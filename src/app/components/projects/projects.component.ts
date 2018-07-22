import { Component, OnInit } from '@angular/core';
import { Projects } from "../../models/projects";
import { ProjectService } from '../../services/project.service';
import { Global } from "../../services/global";
import {
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';

@Component({
	selector: "app-projects",
	templateUrl: "./projects.component.html",
	styleUrls: ["./projects.component.css"],
	providers: [ProjectService],
	animations: [
		trigger('flyInOut', [
			state('in', style({ 
				transform: 'translateX(0)' })),
			transition('void => *', [
				style({ transform: 'translateX(-100%)' }),
				animate(100)
			]),
			transition('* => void', [
				animate(100, style({ transform: 'translateX(100%)' }))
			])
		])
	]
})
export class ProjectsComponent implements OnInit {
	public projects: Projects[];
	public url: string;
	public show_bool: boolean;
	public show: string;
	constructor(
		private _projectService: ProjectService
	) {
		this.url = Global.url;
		this.show_bool = false;
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

	showProject(){
		return this.show_bool? 'in' : 'void';
	}

	toggleState(){
		this.show_bool = !this.show_bool;
	}
}
