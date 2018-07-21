import { Component, OnInit } from '@angular/core';
import { Projects } from "../../models/projects";
import { ProjectService } from "../../services/project.service";
import { UploadService } from '../../services/upload.service';
import { Global } from "../../services/global";
import { ActivatedRoute, Router , Params} from '@angular/router';

@Component({
	selector: "app-edit",
	templateUrl: "../create/create.component.html",
	styleUrls: ["./edit.component.css"],
	providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
	public title: string;
	public project: Projects;
	public status: string;
	public filesToUpload: Array<File>;
	public saveProject;
	public url: string;
	constructor(
		private _projectService: ProjectService,
		private _uploadService: UploadService,
		private _route: ActivatedRoute,
		private _router: Router
	) {
		this.url = Global.url;
		this.title = "Editar Proyecto";
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
				console.log(this.project);
			},
			error => {
				console.log(<any>error);
			}
		);
	};
	onSubmit(){
		this._projectService.editProject(this.project).subscribe(response => {
        if (response.project) {
		  // Subir la imagen
		  if(this.filesToUpload){
			  this._uploadService.makeFileRequest( Global.url + "upload-image/" + response.project._id, [], this.filesToUpload, "image" )
				.then((result: any) => {
	
				  this.saveProject = result.project;
				  
				  this.status = "success";
				  
				}
			);
		  }else{
			  this.saveProject = response.project;

			  this.status = "success";
		  }
        } else {
          this.status = "failed";
        }
      }, error => {
        console.log(<any>error);
      });
	}
	fileChangeEvent(fileInput: any) {
		console.log(fileInput);
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
}
