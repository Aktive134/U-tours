import { Request, Response, NextFunction } from 'express';
import ApplicationError from '../../common/error-handler/ApplicationError';
import Constant from '../../constant';
import Tour from './tours.model';
import QueryModifier from '../../lib/modify-query';

const Messages = Constant.messages;
class TourController {
  async createTourHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const tour = new Tour(req.body);
      await tour.save();
      res.status(201).json({
        message: Messages.tourCreated,
        data: {
          tour,
        },
        success: true,
      });
    } catch (error: any) {
      return next(new ApplicationError(error));
    }
  }

  async getToursHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const queryModify = new QueryModifier(Tour.find(), req.query);
      const modifiedQuery = queryModify.filter().sort().limitFields().paginate();
      const tours = await modifiedQuery.query;

      res.status(200).json({
        message: Messages.toursAvailable,
        result: tours.length,
        data: {
          tours,
        },
        success: true,
      });
    } catch (error: any) {
      return next(new ApplicationError(error.message));
    }
  }

  async getTourByIdHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tour = await Tour.findById({ _id: id });
      res.status(200).json({
        message: Messages.toursAvailable,
        data: {
          tour,
        },
        success: true,
      });
    } catch (error: any) {
      return next(new ApplicationError(error.message));
    }
  }

  async editTourHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const tour = await Tour.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json({
        message: Messages.tourUpdated,
        data: {
          tour,
        },
        success: true,
      });
    } catch (error: any) {
      return next(new ApplicationError(error.message));
    }
  }

  async deleteTourHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await Tour.findByIdAndDelete({ _id: id });
      res.status(204).json({
        message: Messages.tourDeleted,
        data: {},
        success: true,
      });
    } catch (error: any) {
      return next(new ApplicationError(error.message));
    }
  }

  async getTourStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await Tour.aggregate([
        {
          $match: { ratingsAverage: { $gte: 4.0 } },
        },
        {
          $group: {
            _id: '$difficulty',
            numTours: { $sum: 1},
            numRatings: { $sum: '$ratingsQuantity'},
            avgRating: { $avg: '$ratingsAverage' },
            avgPrice: { $avg: '$price' },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },
          },
        },
        {
          $sort: { avgPrice: 1}
        }
      ]);
      res.status(200).json({
        data: {
          stats
        },
        success: true,
      });
    } catch (error: any) {
      return next(new ApplicationError(error.message));
    }
  }
}

export default new TourController();
