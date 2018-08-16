import { Component, OnInit } from '@angular/core';
import { Project, Status } from '../../shared/models/project';
import { ProjectsService } from '../../shared/services/projects.service';
import { Router } from '@angular/router';
import { Check, Types } from '../../shared/models/check';
import { ChecksService } from '../../shared/services/checks.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public project: Project;
  public checks: Check[];

  constructor(private projectService: ProjectsService, private router: Router, private checksService: ChecksService) { }

  async ngOnInit() {
    this.project = this.projectService.project;
    this.checks = await this.checksService.getChecksByProject(this.project);
  }

  public async onDestroyClick() {
    if (confirm('Are you sure? This will permanently delete this project')) {
      const amount = await this.projectService.deleteProject(this.project);
      if (amount === 1) {
        this.router.navigateByUrl('/projects');
      }
    }
  }

  public pauseProject() {
    this.projectService.changeStatus(this.project, Status.INACTIVE);
  }

  public resumeProject() {
    this.projectService.changeStatus(this.project, Status.ACTIVE);
  }

  public async addCheck() {
    const check: Check = {
      projectId: this.project._id,
      active: true,
      name: 'First check',
      type: Types.DAILY,
      endpoint: 'https://pocketfriendlytowns.com/westend/v4/settings/info',
    };

    const result = await this.checksService.createCheck(check);
    this.checks.push(result);
  }
}
