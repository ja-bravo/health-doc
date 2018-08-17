import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Project, Status } from '../../shared/models/project';
import { ProjectsService } from '../../shared/services/projects.service';
import { Router } from '@angular/router';
import { Check, Types } from '../../shared/models/check';
import { ChecksService } from '../../shared/services/checks.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatTable, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public project: Project;
  public columnsToDisplay = ['id', 'name', 'endpoint', 'type', 'status', 'createdAt', 'controls'];
  public subscription: Subscription;
  public dataSource = new MatTableDataSource<Check>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Check>;

  constructor(private projectService: ProjectsService, private router: Router, 
  private checksService: ChecksService, private dialog: MatDialog) { }

  async ngOnInit() {
    this.project = this.projectService.project;
    this.subscription = this.checksService.getChecksByProjectObv(this.project).subscribe(checks => this.dataSource.data = checks);
    this.dataSource.paginator = this.paginator;
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
    const dialogRef = this.dialog.open(NewCheckDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async (result: Check) => {
      if (result) {
        result.projectId = this.project._id;
        result.checkType = Number.parseInt(result.checkType.toString());
        const newCheck = await this.checksService.createCheck(result);
        this.dataSource.data = [...this.dataSource.data, newCheck];
        this.dataSource._updatePaginator(this.dataSource.data.length);
      }
    });

  }

  public async deleteCheck(check: Check, e: Event) {
    e.stopPropagation();
    if (confirm('Are you sure? This will permanently delete this check')) {
      const amount = await this.checksService.deleteCheck(check);
      if (amount === 1) {
        this.dataSource.data = this.dataSource.data.filter(c => c._id !== check._id);
      }
    }
  }

  public async pauseCheck(check: Check, e: Event) {
    e.stopPropagation();
    const result = await this.checksService.changeStatus(check, Status.INACTIVE);
    if (result === 1) {
      check.active = false;
    }
  }

  public async resumeCheck(check: Check, e: Event) {
    e.stopPropagation();
    const result = await this.checksService.changeStatus(check, Status.ACTIVE);
    if (result === 1) {
      check.active = true;
    }
  }

  public getType(check: Check) {
    switch (check.checkType) {
      case Types.DAILY:
        return 'Daily';
      case Types.EVERY_HOUR:
        return 'Hourly';
      case Types.EVERY_HALF_HOUR:
        return '30 minutes';
      case Types.EVERY_TEN_MINUTES:
        return '10 minutes';
      case Types.EVERY_FIVE_MINUTES:
        return '5 minutes';
    }
  }
}

@Component({
  selector: 'app-check-dialog',
  templateUrl: 'newDialog.html',
})
export class NewCheckDialogComponent {

  public checkTypes = Types;
  constructor(
    public dialogRef: MatDialogRef<NewCheckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
