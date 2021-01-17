import IWeatherCondition from "Interfaces/models/weather-condition";
import translatableContentSchema from "Models/translatable-content";
import * as mongoose from "mongoose";

const weatherConditionSchema = new mongoose.Schema({
  icon: Number,
  text: [translatableContentSchema],
});

const weatherConditionModel = mongoose.model<
  IWeatherCondition & mongoose.Document
>("WeatherCondition", weatherConditionSchema);

export default weatherConditionModel;
