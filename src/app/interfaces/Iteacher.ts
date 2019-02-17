export interface teachingCourses{
  course:string,
  calss:string
}

export interface Teacher{
    firstName: string,
    lastName: string,
    dept: string,
    courses: string[],
    nowTeaching: teachingCourses[]
}
