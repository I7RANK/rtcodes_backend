import mongoose from 'mongoose';
const { Schema } = mongoose;

const storeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    address: String,
    city: String,
    currentCode: {
      code: String,
      createdAt: Date,
    },
    codesHistory: [{ code: String, createdAt: Date }],
  },
  { timestamps: true }
);

const Store = mongoose.model('Store', storeSchema);

export default Store;
