import { Request, Response, NextFunction } from "express";

const aliasTopTours = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.query.limit = '5';
        req.query.sort = '-ratingsAverage,price';
        req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
        next();
    } catch (error) {
        console.log(error)
    }
}
export default aliasTopTours;