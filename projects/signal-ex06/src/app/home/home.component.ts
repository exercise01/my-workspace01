import {
  AfterRenderPhase,
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../models/model';
import { CoursesService } from '../sevices/courses.service';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import {MatDialog} from "@angular/material/dialog";
import { EditService } from '../sevices/edit.service';

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
  styleUrl: './home.component.css',
})
export class HomeComponent {
  #courses = signal<Course[]>([]);

  coursesService = inject(CoursesService);
  
  editService = inject(EditService);

  //courses = input.required<Course[]>();

  courseUpdated = output<Course>();

  //courseDeleted = output<string>();

  courses = computed(() => {
    const courses = this.#courses();
    return courses;
  });

  dialog = inject(MatDialog);

  constructor() {
    this.loadCourses().then(() =>
      console.log(`All courses loaded:`, this.#courses())
    );
  }

  async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses);
    } catch (err) {
      alert(`Error loading courses!`);
      console.log(err);
    }
  }

  async onEditCourse(course: Course) {
    const newCourse = await openEditCourseDialog(
      this.dialog,
      {
        mode: "update",//update
        title: "Update Existing Course",
        course
      }
    )
    if (!newCourse) {
      return;
    }
    console.log(`Course edited:`, newCourse);
    this.courseUpdated.emit(newCourse);
  } 

  // onCourseDeleted(course: Course) {
  //   this.courseDeleted.emit(course.id);
  // }

 

  async onCourseDeleted(course: Course) {
    console.log(`edit delete`);
    try {
      //courseId = course.id;
      await this.editService.deleteCourse(course.id);
      const courses = this.#courses();
      // const newCourses = courses.filter(
      //   course => course.id !== courseId);
      //filter内でtrueが返ってきたもののみを抽出（arrayのみ使用できる）
      const newCourses =courses.filter(
         course => course.id!
      );
      this.#courses.set(newCourses);
    }
    catch (err) {
      console.error(err);
      alert(`Error deleting course.`);
    }
  }
  
  async onAddCourse() {
    const newCourse = await openEditCourseDialog(
      this.dialog,
      {
        mode: "create",
        title: "Create New Course"
      }
    )
    if (!newCourse) {
      return;
    }
    const newCourses = [
      ...this.#courses(),
      newCourse
    ];
    this.#courses.set(newCourses);
  }  
  // onCourseUpdated(updatedCourse: Course) {
  //   const courses = this.#courses();
  //   const newCourses = courses.map(course => (
  //     course.id === updatedCourse.id ? updatedCourse : course
  //   ));
  //   this.#courses.set(newCourses);
  // }
}
