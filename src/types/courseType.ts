interface CourseType {
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

// credits: string;
//     length: string;
//     format: string;
//     courseid: string;
//     gradelevels: string;
//     prerequisites: string;
//     fees: string;
//     corequisite: string;
//     subsequent: string;
//     considerations: string;
//     description: string;

export default CourseType;
