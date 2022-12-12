import { Response } from "express";

export interface IBodyDev{
    statusCode: number;
    message: string | any;
    data: string | number | Record<string,any>[] | Record<string,any>;
    error: string | any;
    stack: string | any;
    status : string
}

export interface IBodyProd{
    statusCode: number;
    message: string | any;
    data: string | number | Record<string,any>[] | Record<string,any>;
    status : string
}

const response = (res: Response, body: IBodyDev | IBodyProd) => {
    return res.status(body.statusCode).json(body);
};

export default response;
