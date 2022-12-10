import { Router } from 'express';
import toursController from './tours.controller';
import checkID from '../../middleware/validate-id';
import aliasTopTours from '../../middleware/alias-modification';

const tourRouter = Router();
const {
  createTourHandler,
  getToursHandler,
  getTourByIdHandler,
  editTourHandler,
  deleteTourHandler,
  getTourStats
} = toursController;

tourRouter.param('id', checkID);
tourRouter.route('/api/v1/tours').post(createTourHandler).get(getToursHandler);
tourRouter.route('/api/v1/tours/top-5-cheap').get(aliasTopTours, getToursHandler);
tourRouter.route('/api/v1/tours/tour-stats').get(getTourStats);

tourRouter
  .route('/api/v1/tours/:id')
  .get(getTourByIdHandler)
  .patch(editTourHandler)
  .delete(deleteTourHandler);

export default tourRouter;
