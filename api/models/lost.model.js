import mongoose from 'mongoose';

const lostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    }
  },
  { timestamps: true }
);

const Lost = mongoose.model('Lost', lostSchema);

export default Lost;
