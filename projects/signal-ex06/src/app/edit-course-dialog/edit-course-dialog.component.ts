import { Component, effect, inject, input, signal, output} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Course } from '../models/model';
import { EditCourseDialogData } from '../models/edit-course-dialog.data.model';
import { EditService } from '../sevices/edit.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CourseCategoryComboboxComponent } from '../course-category-combobox/course-category-combobox.component';
import { CourseCategory } from '../models/course-category.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'edit-course-dialog',
  imports: [
    //LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent,
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.css',
})
export class EditCourseDialogComponent {
  dialogRef = inject(MatDialogRef);

  courses = input.required<Course[]>();
//
  courseUpdated = output<Course>();

  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);

  fb = inject(FormBuilder);

  form = this.fb.group({
    description: [''],
    longDescription: [''],
    category:['']
    //iconUrl: [''],
  });

  editService = inject(EditService);

  category = signal<CourseCategory>('BEGINNER');

  constructor() {
    this.form.patchValue({
      description: this.data?.course?.description,
      longDescription: this.data?.course?.longDescription,
      //iconUrl: this.data?.course?.iconUrl,
    });
    this.category.set(this.data?.course?.category ?? 'BEGINNER');
    effect(() => {
      console.log(`Course category bi-directional binding:
      ${this.category()}`);
    });
  }


//ダイアログを閉じる
onClose() {
    this.dialogRef.close({title: "Hello World!"});
  }


  //記事の変更と新しい記事
  
  async onSave() {
    const courseProps = this.form.value as Partial<Course>;
    courseProps.category = this.category();
    if (this.data?.mode === 'update') {
      await this.saveCourse(this.data?.course!, courseProps);//.description
    } else if (this.data?.mode === 'create') {
      await this.createCourse(courseProps);
    }
  }

  //記事の変更
  async saveCourse(course: Course, changes: Partial<Course>) {
    try {
      const updatedCourse = await this.editService.saveCourse(
        course.id,
        changes
      );
      this.dialogRef.close(updatedCourse);
    } catch (err) {
      console.log(err);//
      alert(`Failed to save the course.`);
    }
  }


  //新しい記事
  async createCourse(course: Partial<Course>) {
    try {
      const newCourse = await this.editService.createCourse(course);
      this.dialogRef.close(newCourse);
    } catch (err) {
      console.log(err);
      alert(`Error creating the course.`);
    }
  }   
  
}

//ダイアログを開く
export async function openEditCourseDialog(
  dialog: MatDialog,
  data: EditCourseDialogData
) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width = '400px';
  config.data = data;

  const close$ = dialog.open(EditCourseDialogComponent, config).afterClosed();

  return firstValueFrom(close$);
}  

