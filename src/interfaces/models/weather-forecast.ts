import IWeatherCondition from "./weather-condition";

interface IWeatherForecast {
  _id: string;
  date: number;
  coordinates: { latitude: number; longitude: number };
  locationName: string;
  temperature: { minimum: number; maximum: number }; // Celsius
  dayWeatherConditionId: string;
  nightWeatherConditionId: string;
}

export default IWeatherForecast;
