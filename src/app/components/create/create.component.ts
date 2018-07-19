import { Component, OnInit } from '@angular/core';
import { Projects } from '../../models/projects';
import { ProjectService } from "../../services/project.service";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService]
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Projects;
  public status: string;
  constructor(
    private _projectService: ProjectService
  ) {
    this.title = 'Crear Proyecto';
    this.project = new Projects('','','','',2019,'','');
   }


  ngOnInit() {

  }
  onSubmit(form){
    console.log(this.project);
    this._projectService.saveProject(this.project).subscribe(
      response =>{
        if(response.project){
          this.status = "success";
          form.reset();
        }else{
          this.status = "failed"
        }
        console.log(response.project);
      },
      error=>{
        console.log(<any>error);
      }
      
    );
  }

}
