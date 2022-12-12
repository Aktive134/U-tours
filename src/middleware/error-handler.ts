import { Request, Response, NextFunction } from 'express';
import ApplicationError from '../common/error-handler/ApplicationError';
import ErrorAlert from '../common/monitoring/ErrorAlert';
import response, { IBodyDev, IBodyProd } from '../lib/http-response';
import fileLogger from '../common/logging/error-logger';
import Constant from '../constant';

type ErrorType = ApplicationError;

const errorHandler = (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorAlert = new ErrorAlert(err.message, err.name);
  errorAlert.notify();

  const errorMessage = `${req.ip} : ${req.method} ${req.url} ${err.statusCode} :${err.name} ${err.message} `;

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  const { message } = err;

  const body: IBodyDev = {
    message: message,
    statusCode: err.statusCode ? err.statusCode : 500,
    data: {},
    stack: err.stack,
    error: err,
    status: err.status,
  };
  const body2: IBodyProd = {
    message: message,
    statusCode: err.statusCode ? err.statusCode : 500,
    data: {},
    status: err.status,
  };

  const sendErrorProd = (res: Response) => {
    //operational error, send message to client;
    if (err.isOperational) {
      response(res, body2);
    } else {
      //Programming or other unknown error; error details concealed;
      fileLogger.log({
        message: errorMessage,
        level: 'error',
      });
      res.status(500).json({
        message: Constant.messages.serverError,
        error: err.message,
        status: 'error',
      });
    }
  };

  const sendErrorDev = (res: Response) => {
    response(res, body);
  };

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(res);
  }
};

export default errorHandler;
