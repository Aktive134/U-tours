import { Request, Response, NextFunction } from 'express';
import ApplicationError from '../../common/error-handler/ApplicationError';
import catchAsync from '../../common/error-handler/catchAsyncError';
import Constant from '../../constant';
import Tour from './tours.model';
import QueryModifier from '../../lib/modify-query';

const Messages = Constant.messages;
class TourController {
  createTourHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const tour = new Tour(req.body);
      await tour.save();
      res.status(201).json({
        message: Messages.tourCreated,
        data: {
          tour,
        },
        success: true,
      });
    }
  );

  getToursHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const queryModify = new QueryModifier(Tour.find(), req.query);
      const modifiedQuery = queryModify
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const tours = await modifiedQuery.query;

      res.status(200).json({
        message: Messages.toursAvailable,
        result: tours.length,
        data: {
          tours,
        },
        success: true,
      });
    }
  );

  getTourByIdHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const tour = await Tour.findById({ _id: id });
      res.status(200).json({
        message: Messages.toursAvailable,
        data: {
          tour,
        },
        success: true,
      });
    }
  );

  editTourHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { name } = req.body;
      const tour = await Tour.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        message: Messages.tourUpdated,
        data: {
          tour,
        },
        success: true,
      });
    }
  );

  deleteTourHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      await Tour.findByIdAndDelete({ _id: id });
      res.status(204).json({
        message: Messages.tourDeleted,
        data: {},
        success: true,
      });
    }
  );

  getTourStats = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const stats = await Tour.aggregate([
        {
          $match: { ratingsAverage: { $gte: 4.0 } },
        },
        {
          $group: {
            _id: '$difficulty',
            numTours: { $sum: 1 },
            numRatings: { $sum: '$ratingsQuantity' },
            avgRating: { $avg: '$ratingsAverage' },
            avgPrice: { $avg: '$price' },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },
          },
        },
        {
          $sort: { avgPrice: 1 },
        },
      ]);
      res.status(200).json({
        data: {
          stats,
        },
        success: true,
      });
    }
  );

  getMonthlyplan = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const year = Number(req.params.year);
      const plan = await Tour.aggregate([
        {
          $unwind: '$startDates',
        },
        {
          $match: {
            startDates: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`),
            },
          },
        },
        {
          $group: {
            _id: { $month: '$startDates' },
            numTourStarts: { $sum: 1 },
            tours: { $push: '$name' },
          },
        },
        {
          $addFields: { month: '$_id' },
        },
        {
          $project: { _id: 0 },
        },
        {
          $sort: { numTourStarts: -1 },
        },
      ]);

      res.status(200).json({
        data: {
          plan,
        },
        success: true,
      });
    }
  );
}

export default new TourController();
