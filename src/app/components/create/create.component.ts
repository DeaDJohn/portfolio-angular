import { Component, OnInit } from '@angular/core';
import { Projects } from '../../models/projects';
import { ProjectService } from "../../services/project.service";
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';


@Component({
	selector: "app-create",
	templateUrl: "./create.component.html",
	styleUrls: ["./create.component.css"],
	providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
	public title: string;
	public project: Projects;
	public status: string;
	public filesToUpload: Array<File>;
	public saveProject;
	public url: string;
	constructor(
		private _projectService: ProjectService,
		private _uploadService: UploadService
	) {
		this.url = Global.url;
		this.title = "Crear Proyecto";
		this.project = new Projects("", "", "", "", 2019, "", "");
	}

	ngOnInit() {}
	onSubmit(form) {
		console.log(this.project);

		// Guardar los datos
		this._projectService.saveProject(this.project).subscribe(
			response => {
				if (response.project) {
					

					// Subir la imagen
					if (this.filesToUpload) {
						this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.filesToUpload, 'image')
							.then((result:any)=>{
								console.log(result);
								this.saveProject = result.project;
								this.status = "success";
								form.reset();
							});
					}else{
						this.saveProject = response.project;
						this.status = "success";
						form.reset();
					}

				} else {
					this.status = "failed";
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	fileChangeEvent(fileInput: any  ){
		console.log(fileInput);
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
}
