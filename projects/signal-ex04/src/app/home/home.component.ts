import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COURSES } from '../db-data';



@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    //MatTabGroup,
    //MatTab
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'  
})
export class HomeComponent  {

  courses = COURSES; 


  constructor(){
   }
}
