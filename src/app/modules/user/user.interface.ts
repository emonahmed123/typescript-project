export type TUser={
  id:string,
  password:string,
  needspasswordChange:boolean,
  role:'admin'|'student'|'faculty'
    status:'in-progress'|'blocked'
  isDeleted:boolean

}