import mongoose from 'mongoose';
const { Schema } = mongoose;

const storeSchema = new Schema({
  name: String,
  address: String,
  city: String,
  currentCode: String,
  codesHistory: [
    { code: String, creationDate: { type: Date, default: Date.now } },
  ],
  creationDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const Store = mongoose.model('Store', storeSchema);

export default Store;
