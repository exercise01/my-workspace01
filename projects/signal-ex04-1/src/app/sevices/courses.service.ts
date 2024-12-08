import { inject, Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { Course } from "../model";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { GetCoursesResponse } from "../get-courses.response";

@Injectable({
    providedIn: "root"
  })
  export class CoursesService {

    http = inject(HttpClient);

    env = environment;

    //RxjsのObservableでなく、Promiseに変える
    async loadAllCourses(): Promise<Course[]>{
    
      const courses$ =      //coursesオブザーバブル
      this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
      //FirstValuefromはRxJSのオペレーター。
      //observableをサブスクライブして渡ってきた最初の値を
      //ObservableからPromiseに変換し、
      //そのsubscriptionを自動的に終了させることが出来ます。
      const response = await firstValueFrom(courses$);
      return response.courses;

        //const response = await fetch(`${this.env.apiRoot}/courses`);
        // .then()
        // .catch();
        //const payload = await response.json();
        //return Promise.resolve(payload.courses);

        //return payload.courses as Course[];
        //return [];
    }
  }