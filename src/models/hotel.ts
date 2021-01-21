import * as mongoose from "mongoose";
import IHotel from "Interfaces/models/hotel";
import mediaSchema from "Models/media";
import translatableContentSchema from "Models/translatable-content";
import addressSchema from "Models/address";
import contactSchema from "Models/contact";

const hotelSchema = new mongoose.Schema(
  {
    hotelId: String,
    chainCode: String,
    brandCode: String,
    dupeId: String,
    name: String,
    rating: String,
    description: [translatableContentSchema],
    amenities: [String],
    media: [mediaSchema],
    cityCode: String,
    location: {
      type: { type: String, enum: ["Point"] },
      coordinates: {
        type: [Number],
      },
    },
    address: addressSchema,
    contact: contactSchema,
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

hotelSchema.virtual("offers", {
  ref: "Offer",
  localField: "_id",
  foreignField: "hotel",
});

hotelSchema.index({ location: "2dsphere" });

const hotelModel = mongoose.model<IHotel & mongoose.Document>(
  "Hotel",
  hotelSchema
);

export default hotelModel;
