import mongoose, { Schema } from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
    },
    maxGroupSize: {
      type: Number,
    },
    difficulty: String,
    ratingsAverage: Number,
    ratingsQuantity: Number,
    price: Number,
    summary: String,
    description: String,
    imageCover: String,
    images: String,
    startDates: Date,
  },
  { timestamps: true }
);

const Tour = mongoose.model('tours', tourSchema);

export default Tour;
