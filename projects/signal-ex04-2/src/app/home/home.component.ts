import { AfterRenderPhase, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../model';
import { CoursesService } from '../sevices/courses.service';

//import { CoursesServiceWithFetch } from '../sevices/courses-fetch.service';
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
export class HomeComponent  {

  //courses: Course[]= COURSES;

  #courses= signal<Course[]>([]);
  //courses= signal<Course[]>([]);

  coursesService = inject(CoursesService);

 //coursesService = inject(CoursesServiceWithFetch);

  courses = computed(() => {
    const courses = this.#courses();
    return courses;
  })

  //oncourses = input.required<Course[]>();

  constructor(){
    //this.allcourses

    this.loadCourses()
      .then(() => console.log(`All courses loaded:`, this.#courses()));  

    //deprecated
    // AfterRenderPhase(()=>{
    //   this.loadCourses()
    //   .then(() => console.log(`All courses loaded:`, this.courses()));  
    // })
  }

  // ngOnInit(){
  //   this.loadCourses()
  //     .then(() => console.log(`All courses loaded:`, this.#courses()));  
  // }

  async loadCourses() {
    try{
      const courses = await this.coursesService.loadAllCourses(); 
      this.#courses.set(courses);
    }
    catch(err){
      alert(`Error loading courses!`);
      console.error(err);
    }

    // try {
    //   const courses = await this.coursesService.loadAllCourses();
      
    // }
    // catch(err) {     
    //   console.error(`Error loading courses!`);
    // }
  }

}
