import { Course } from '../models/model';

export type EditCourseDialogData = {
  mode: 'create' | 'update';
  title?: string;
  description?: string;
  course?: Course | undefined;
};
