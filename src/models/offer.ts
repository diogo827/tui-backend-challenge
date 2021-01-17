import IOffer from "Interfaces/models/offer";
import * as mongoose from "mongoose";
import translatableContentSchema from "./translatable-content";

const rateFamilyEstimatedSchema = new mongoose.Schema({
  code: String,
  type: String,
});

const roomSchema = new mongoose.Schema({
  type: String,
  description: [translatableContentSchema],
});

const guestsSchema = new mongoose.Schema({
  adults: Number,
  childAges: Number,
});

const priceSchema = new mongoose.Schema({
  currency: String,
  total: String,
  base: String,
});

const offerSchema = new mongoose.Schema(
  {
    _id: String,
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
    checkInDate: Number,
    checkOutDate: Number,
    roomQuantity: Number,
    rateCode: String,
    rateFamilyEstimated: rateFamilyEstimatedSchema,
    category: String,
    description: [translatableContentSchema],
    room: roomSchema,
    guests: guestsSchema,
    price: priceSchema,
  },
  {
    _id: false,
  }
);

const offerModel = mongoose.model<IOffer & mongoose.Document>(
  "Offer",
  offerSchema
);

export default offerModel;
