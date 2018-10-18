import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats-tag1',
  templateUrl: './stats-tag1.component.html',
  styleUrls: ['./stats-tag1.component.css']
})
export class StatsTag1Component implements OnInit {
  @Input() value: string;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
