import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../model';
//import { CoursesService } from '../sevices/courses.service';

import { CoursesServiceWithFetch } from '../sevices/courses-fetch.service';
import { COURSES } from '../db-data';
import { Observable } from 'rxjs';
//import { COURSES } from '../db-data';
//import {MatTab, MatTabGroup} from "@angular/material/tabs";


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
export class HomeComponent implements OnInit {

  courses= signal<Course[]>([]);

  coursesService = inject(CoursesServiceWithFetch);

  constructor(){
    //  this.loadCourses()
    //    .then(() => console.log(`All courses loaded:`, this.courses));  

    //deprecated
    // AfterRenderPhase(()=>{
    //   this.loadCourses()
    //   .then(() => console.log(`All courses loaded:`, this.courses()));  
    // })
  }

  ngOnInit(){
    this.loadCourses()
    .then(() => console.log(`All courses loaded:`,this.courses()));  
  }

  async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.courses.set(courses);
    }
    catch(err) {     
      console.error(`Error loading courses! :`,err);
    }      
  }
}
