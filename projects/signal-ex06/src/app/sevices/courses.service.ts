import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Course } from '../models/model';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetCoursesResponse } from '../get-courses.response';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  http = inject(HttpClient);

  env = environment;

  //RxjsのObservableでなく、Promiseに変える
  async loadAllCourses(): Promise<Course[]> {
    const courses$ = //coursesオブザーバブル
      this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
    //FirstValuefromはRxJSのオペレーター。
    //observableをサブスクライブして渡ってきた最初の値を
    //ObservableからPromiseに変換し、
    //そのsubscriptionを自動的に終了させることが出来ます。
    const response = await firstValueFrom(courses$);
    return response.courses;
  }

  //-------------------
  async createCourse(course: Partial<Course>) : Promise<Course> {
    const course$ =
      this.http.post<Course>(`${this.env.apiRoot}/courses`, course)
    return firstValueFrom(course$);
  }

  async saveCourse(courseId:string,
                   changes: Partial<Course>) : Promise<Course> {
    const course$ =
      this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`,
        changes)
    return firstValueFrom(course$);
  }

  async deleteCourse(courseId:string) {
    const delete$ =
      this.http.delete(`${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(delete$);
  }

}
