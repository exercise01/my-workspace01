import { Component, signal } from '@angular/core';
import { COURSES } from './db-data';
//import { RouterOutlet } from '@angular/router';

type Counter = {
  value: number;
}

@Component({
  selector: 'app-root',
  
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  counter = signal<Counter>({
    value: 100
  });

  courses= COURSES;  

  incremental(){
    //this.counter().value++ ;
   this.counter.update(counter => ({
    ...counter,
    value: counter.value + 1
   }))
  }
  
  message = 'Hello World !';

  model = {
      message: 'Hello World !'
  };

  isAdmin(){
    return true;
  }



  // badges(){
  //   COURSES
  // }

  // get calculatedValue() {
  //     return "Calculated Value";
  // }
}
