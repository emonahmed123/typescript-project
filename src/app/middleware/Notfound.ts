import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound=(err:any,req:Request,res:Response)=>{


  return res.status(httpStatus.NOT_FOUND).json({
     success:false,
     message:'API NOT FOUND',
     error:''
  })
}

export default notFound