import { Component, OnInit } from '@angular/core';
import { Naming } from '../../service/page.service';
import { Chart } from 'chart.js'

import { CurrentUser } from 'src/app/service/currentUser.service';
import { Forms } from '../../service/forms.service';

import { CrudService } from 'src/app/service/crud.service';
import { from } from 'rxjs';




@Component({
  selector: 'overview-page',
  templateUrl: './OverviewPage.component.html',
  styleUrls: ['./OverviewPage.component.css']
})
export class OverviewPageComponent implements OnInit {

  constructor(
    private service: Naming,
    private currentUser: CurrentUser,
    public formService: Forms,
    private crudService: CrudService) { }

  pageTittle: string = "Overview";

  allSquads: Array<any> = this.currentUser.squads
  allCurrentTasks: number;
  AllCurrentMembers: number;
  mostTaskMember;
  mostOpenTask;
  mostClosedTask = '';


  ngOnInit() {



    // method to change page tittle to the page name
    this.service.changeTittle(this.pageTittle)


  }



  chartLoad(squadId: string) {

    // to use ths , we need to have some onderscheid tussen open and closed tasks 




    let squadData

    let openTasks: number = 0;
    let closedTasks: number = 0;

    // loop door alle squads
    for (let i = 0; i < this.allSquads.length; i++) {

      // zoek deze squad id
      if (squadId == this.allSquads[i][0]) {

        // get alle data van deze squad 
        squadData = this.allSquads[i]
        this.allCurrentTasks = squadData[2].length;

        // onderscheid tussen open en closed tasks
        for (let k = 0; k < squadData[2].length; k++) {

          if (squadData[2][k][1].State == "Open") {
            openTasks++;
          }
          else {
            closedTasks++
          }
        }



      }
    }



    var myChart = new Chart("chart", {
      type: 'pie',
      data: {
        labels: ['open task', 'closed task',],
        datasets: [{
          label: '# of Votes',
          data: [openTasks, closedTasks],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true

      }
    });

    this.MemberChart(squadData);


  }

  async MemberChart(squad: Array<any>) {


    this.AllCurrentMembers = squad[1].Members.length;
    let membersNames: Array<any> = [];
    let allMemberTask: Array<any> = [];
    let count = 0;


    for (let i: number = 0; i < squad[1].Members.length; i++) {
      membersNames.push(squad[1].Members[i].name)
    }


    // loop door lijst van membernames
    for (let i: number = 0; i < squad[1].Members.length; i++) {

      // voor elke tasks in deze squad
      for (let j = 0; j < squad[2].length; j++) {

        // als deze naam gelijkt is aan tasks voldoener 
        if (membersNames[i] == squad[2][j][1].Assign) {
          count++;

        }
      }
      allMemberTask.push(count);
      count = 0

    }


    //console.log(membersNames)
    // console.log(allMemberTask)




    var myChart = new Chart("chart2", {
      type: 'horizontalBar',
      data: {
        labels: membersNames,
        barThickness: 1,
        datasets: [{
          label: '# of Task',
          data: allMemberTask,
          backgroundColor: [

            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(54, 84, 89, 0.2)',
            'rgba(113, 106, 92, 0.4)',
            'rgba(0, 0, 0, 0.4)',

          ],
          borderColor: [

            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(54, 84, 89, 1)',
            'rgba(113, 106, 92, 1)',
            'rgba(0, 0, 0, 1)',

          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,

        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }

          }],
          yAxes: [{

          }]

        }

      }
    });


    this.completionChart(squad, membersNames)
  }

  completionChart(squad, membersNames) {

    let openCount = 0;
    let openArr = [];
    let closedCount = 0;
    let closedArr = [];


    // loop door lijst van membernames
    for (let i: number = 0; i < squad[1].Members.length; i++) {

      // voor elke tasks in deze squad
      for (let j = 0; j < squad[2].length; j++) {

        // als deze naam gelijkt is aan tasks voldoener 
        if (membersNames[i] == squad[2][j][1].Assign) {


          if (squad[2][j][1].State == "Open") {
            openCount++
          }
          else {
            closedCount++;
          }

        }
      }

      openArr.push(openCount);
      closedArr.push(closedCount);
      openCount = 0;
      closedCount = 0;



      //allMemberTask.push(count);

    }


    var mixedChart = new Chart("chart3", {
      type: 'horizontalBar',
      data: {
        datasets: [{
          label: 'Open Tasks',
          data: openArr,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',

          ],
          borderWidth: 1
        }, {
          label: 'Closed tasks',
          data: closedArr,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',

          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',


          ],
          borderWidth: 1,
          // Changes this dataset to become a line
          type: 'horizontalBar'
        }],

        labels: membersNames
      },


      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          yAxes: [{



          }],
          xAxes: [{

            ticks: {
              beginAtZero: true, callback: function (value) { if (value % 1 === 0) { return value; } }
            }

          }]

        }
      }
    });



    this.summaryLoad(membersNames, openArr, closedArr, squad)
  }

  summaryLoad(names, open, closed, squad) {

    // these are the numbers in ratio to all members of this squad

    let openRatio = [];
    let closedRatio = [];
    let mostTask = [];
    let allTasks = 0;


    for (let i: number = 0; i < names.length; i++) {

      // voor elke tasks in deze squad
      for (let j = 0; j < squad[2].length; j++) {

        // als deze naam gelijkt is aan tasks voldoener 
        if (names[i] == squad[2][j][1].Assign) {

          allTasks++;



        }
      }

      mostTask.push(allTasks)
      allTasks = 0;



      openRatio.push((open[i] / mostTask[i]) * this.allCurrentTasks)




      closedRatio.push((closed[i] / mostTask[i]) * this.allCurrentTasks)


    }




    // haal naam van memberop van die met de meeste tasks
    this.mostTaskMember = names[mostTask.indexOf(Math.max(...mostTask))]


    this.mostOpenTask = names[openRatio.indexOf(Math.max(...openRatio))]
    this.mostClosedTask = names[closedRatio.indexOf(Math.max(...closedRatio))]


  }




}


