import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Constant from '../constant';
import catchAsync from '../common/error-handler/catchAsyncError';
import ApplicationError from '../common/error-handler/ApplicationError';

const Messages = Constant.messages;
const checkID = catchAsync (async (req: Request, res: Response, next: NextFunction, val: string) => {
  const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(id)) {
      return next(new ApplicationError(Messages.DoesNotExist, 404));
    }
    next();
})
export default checkID;
