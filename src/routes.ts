import { Router, Request, Response } from "express";
import tourRouter from "./features/tours/tours.routes";

const router = Router() 

router.get("/", (
    req: Request, 
    res : Response
) => {
    res.status(200).json({
        message: "Service Running Ok", 
        success: true,  
        data : []
    })
});

router.use(tourRouter);



export default router