import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  template: '<span style="color:orange; background-color:red">custom snackbar</span>'
})
export class SnackbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
