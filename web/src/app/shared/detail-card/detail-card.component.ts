import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss']
})
export class DetailCardComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;
  
  constructor() { }

  ngOnInit() {
  }

}
