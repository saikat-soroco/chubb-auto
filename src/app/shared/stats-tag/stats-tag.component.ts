import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats-tag',
  templateUrl: './stats-tag.component.html',
  styleUrls: ['./stats-tag.component.css']
})
export class StatsTagComponent implements OnInit {
  @Input() value: string;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
