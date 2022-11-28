import { Request, Response, NextFunction } from "express";
import { toUSVString } from "util";
import ApplicationError from "../../common/error-handler/ApplicationError";
import BadRequestError from "../../common/error-handler/BadRequestError";
import Constant from "../../constant";
import Tour from "./tours.model";

const Messages = Constant.messages;

class TourController {
    async createTourHandler (req: Request, res: Response, next: NextFunction) {
        try {
            const tour = new Tour(req.body);
            await tour.save();
            res.status(201).json({
                message: Messages.tourCreated,
                data: {
                    tour
                },
                success: true
            })
        } catch (error: any) {
            return next(new ApplicationError(error.messsage));
        }
    }

    async getToursHandler (req: Request, res: Response, next: NextFunction) {
        try {
            const tours = await Tour.find({});
            res.status(200).json({
                message: Messages.toursAvailable,
                data: {
                    tours
                },
                success: true
            })
        } catch (error: any) {
            return next (new ApplicationError(error.message));
        }
    }
    async getTourByIdHandler (req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const tour = await Tour.findById({ _id: id });
            if(!tour){
                return next(new BadRequestError(Messages.tourNotExist))
            }
            res.status(200).json({
                message: Messages.toursAvailable,
                data: {
                    tour
                },
                success: true
            })
        } catch (error: any) {
            return next(new ApplicationError(error.message))
        }
    }
    async editTourHandler (req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const tour = await Tour.findOne({ _id: id });
            if(!tour){
                return next(new BadRequestError(Messages.tourNotExist));
            }
            tour.set({
                name
            });
            const newTour = await tour.save();
            res.status(200).json({
                message: Messages.tourUpdated,
                data: {
                    tour: newTour
                },
                success: true
            })

        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }
    async deleteTourHandler (req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await Tour.findByIdAndDelete({ _id: id });
            res.status(204).json({
                message: Messages.tourDeleted,
                data: {},
                success: true
            }) 
        } catch (error: any) {
            return next (new ApplicationError(error.message));
        }
    }
}

export default new TourController();


