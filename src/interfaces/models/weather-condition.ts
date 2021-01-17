import ITranslatableContent from "./translatable-content";

interface IWeatherCondition {
  icon: number;
  text: [ITranslatableContent];
}

export default IWeatherCondition;
