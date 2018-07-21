import { Component, OnInit } from '@angular/core';
import { Projects } from "../../models/projects";
import { ProjectService } from "../../services/project.service";
import { Global } from "../../services/global";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
	public url: string;
	public project: Projects;
	public project_name: string;
	public project_desc: string;
	public project_cat: string;
	public image_name: string;
	public project_lang: string;
	public project_year: number;

	public confirm: boolean;
  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
	this.url = Global.url;
	  this.confirm = false;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProject(id);
    });
  }

  getProject(id) {
    this._projectService.getProject(id).subscribe(
      response => {
		this.project = response.project;
		  this.project_name = this.project.name;
		  this.project_desc = this.project.description;
		  this.project_cat = this.project.category;
		  this.image_name = this.project.image;
		  this.project_lang = this.project.langs;
		  this.project_year = this.project.year;
        console.log(this.project);
      },
      error => {
        console.log(<any>error);
      }
    );
  };

	deleteProject(id){
		this._projectService.deleteProject(id).subscribe( 
			response => {
				if(response.project){
					this._router.navigate(['/proyectos']);
				}
				console.log(this.project);
			},
			error => {
				console.log(<any>error);
			});
	}
	askDelete(param){
		this.confirm = param;
	}
}
