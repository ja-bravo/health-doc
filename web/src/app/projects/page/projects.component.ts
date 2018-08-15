import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { ProjectsService } from '../../shared/services/projects.service';
import { Project, Status } from '../../shared/models/project';
import { MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  public columnsToDisplay = ['status', 'name', 'checks', 'createdAt', 'controls'];
  public subscription: Subscription;
  public dataSource = new MatTableDataSource<Project>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public moment = moment;

  constructor(private projectsService: ProjectsService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.subscription = this.projectsService.getProjects().subscribe(p => this.dataSource.data = p);
    this.dataSource.paginator = this.paginator;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onProjectClick(project: Project) {
    this.projectsService.setProject(project);
    this.router.navigateByUrl('/projects/details');
  }

  public pauseProject(project: Project, e) {
    e.stopPropagation();
    this.projectsService.changeStatus(project, Status.INACTIVE).subscribe(p => project.active = false);
  }

  public resumeProject(project: Project, e: Event) {
    e.stopPropagation();
    this.projectsService.changeStatus(project, Status.ACTIVE).subscribe(p => project.active = true);
  }

  public deleteProject(project: Project, e: Event) {
    e.stopPropagation();
    if (confirm('Are you sure? This will permanently delete this project')) {
      this.projectsService.deleteProject(project).subscribe(amount => {
        if (amount === 1) {
          this.dataSource.data = this.dataSource.data.filter(p => p._id !== project._id);
        }
      });
    }
  }

  public createProject() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectsService.createProject({name: result}).subscribe(project => {
          this.projectsService.setProject(project);
          this.router.navigateByUrl('/projects/details');
        });
      }
    });
  }

  public ngOnDestroy() { this.subscription.unsubscribe(); }
}


@Component({
  selector: 'app-project-dialog',
  templateUrl: 'dialog.html',
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
