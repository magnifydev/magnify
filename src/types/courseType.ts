export interface CourseType {
  courseid: string;
  coursename: string;
  credits: string;
  description: string;
  format?: string;
  gradelevels: string;
  length: string;
  prerequisites?: string;
  corequisite?: string;
  considerations?: string;
  subsequent?: string;
  fees?: string;
  tags?: string[];
}
