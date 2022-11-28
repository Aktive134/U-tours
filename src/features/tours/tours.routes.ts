import { Router } from 'express';
import toursController from './tours.controller';
import checkID from '../../middleware/validate-id';

const tourRouter = Router();
const {
  createTourHandler,
  getToursHandler,
  getTourByIdHandler,
  editTourHandler,
  deleteTourHandler,
} = toursController;

tourRouter.param('id', checkID);
tourRouter.route('/api/v1/tours').post(createTourHandler).get(getToursHandler);

tourRouter
  .route('/api/v1/tours/:id')
  .get(getTourByIdHandler)
  .patch(editTourHandler)
  .delete(deleteTourHandler);

export default tourRouter;
