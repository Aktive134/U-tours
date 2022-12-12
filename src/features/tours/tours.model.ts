import mongoose, { Schema } from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name of tour cannot be empty'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour must not have more than 40 characters'],
      minlength: [10, 'A tour must not have less than 10 characters']
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
      required: [true, 'Difficulty cannot be empty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
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
  { 
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true 
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
})

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
