import mongoose, { Schema } from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name of tour cannot be empty'],
      unique: true,
      trim: true
    },
    duration: {
      type: Number,
      required: [true, 'Provide a duration for the tour']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Number of person(s) should be provided']
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty cannot be empty']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'Price cannot be empty']
    },
    priceDiscount: {
      type: Number
    },
    summary: {
      type: String,
      required: [true, 'Provide a summary for the tour'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'Provide an image for the tour']
    },
    images: [String],
    startDates: [Date],
  },
  { timestamps: true }
);

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
