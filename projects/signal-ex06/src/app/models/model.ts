import { CourseCategory } from "./course-category.model";

export interface Course{
    id:string;
    description:string;
    //iconUrl?: string;
    longDescription: string; 
    category: CourseCategory  ;
}