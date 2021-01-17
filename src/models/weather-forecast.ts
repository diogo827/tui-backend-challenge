import IWeatherForecast from "Interfaces/models/weather-forecast";
import * as mongoose from "mongoose";

const temperatureSchema = new mongoose.Schema({
  minimum: Number,
  maximum: Number,
});

const weatherForecastSchema = new mongoose.Schema({
  date: Number,
  location: {
    type: { type: String },
    coordinates: [],
  },
  locationName: String,
  temperature: temperatureSchema,
  day: {
    ref: "WeatherCondition",
    type: mongoose.Schema.Types.ObjectId,
  },
  night: {
    ref: "WeatherCondition",
    type: mongoose.Schema.Types.ObjectId,
  },
});

weatherForecastSchema.index({ location: "2dsphere" });

const weatherForecastModel = mongoose.model<
  IWeatherForecast & mongoose.Document
>("WeatherForecast", weatherForecastSchema);

export default weatherForecastModel;
