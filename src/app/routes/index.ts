import { Router } from "express";
import { UserController } from "../modules/user/user.conroller";
import { userRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/stduent/stduent.route";
import { AcademicSemesterRoutes } from "../modules/AcademicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";


const router=Router();

const modulesRoutes =[
  {
    path:'/users',
    route:userRoutes
  },
  {
    path:'/studentss', 
    route:StudentRoutes
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
]



modulesRoutes.forEach((route)=>router.use(route.path,route.route))


export default router