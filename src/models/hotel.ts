import * as mongoose from "mongoose";
import IHotel from "Interfaces/models/hotel";
import mediaSchema from "Models/media";
import translationSchema from "Models/translation";
import addressSchema from "Models/address";
import contactSchema from "Models/contact";

const hotelSchema = new mongoose.Schema({
  hotelId: String,
  chainCode: String,
  brandCode: String,
  dupeId: String,
  name: String,
  rating: String,
  description: [translationSchema],
  amenities: String,
  media: [mediaSchema],
  cityCode: String,
  latitude: Number,
  longitude: Number,
  address: addressSchema,
  contact: contactSchema,
});

const hotelModel = mongoose.model<IHotel & mongoose.Document>(
  "Hotel",
  hotelSchema
);

export default hotelModel;
