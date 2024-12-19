import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Course } from "../models/model";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class EditService {
    http = inject(HttpClient);

    env = environment;

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
        return firstValueFrom(course$);//
      }
    
      async deleteCourse(courseId:string) {
        const delete$ =
          this.http.delete(`${this.env.apiRoot}/courses/${courseId}`);
          console.log(`edit delete`)
        return firstValueFrom(delete$);
      }
    
  }