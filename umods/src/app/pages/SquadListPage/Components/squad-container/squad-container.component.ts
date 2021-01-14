import { Component, OnInit, Input } from '@angular/core';






@Component({
  selector: 'squad-container',
  templateUrl: './squad-container.component.html',
  styleUrls: ['./squad-container.component.css']
})
export class SquadContainerComponent implements OnInit {

  @Input() icon: string;
  @Input() title: string;
  @Input() countMem: number = 0;
  @Input() countTasks: number = 0;





  constructor() { }













  ngOnInit(): void {


  }

}
