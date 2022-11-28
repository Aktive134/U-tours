import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Constant from '../constant';
import BadRequestError from '../common/error-handler/BadRequestError';
import ApplicationError from '../common/error-handler/ApplicationError';

const Messages = Constant.messages;
const checkID = async (
  req: Request,
  res: Response,
  next: NextFunction,
  val: string
) => {
  try {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(id)) {
      return next(new BadRequestError(Messages.DoesNotExist));
    }
    next();
  } catch (error: any) {
    return next(new ApplicationError(error.messsage));
  }
};
export default checkID;
