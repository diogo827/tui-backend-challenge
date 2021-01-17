import IMedia from "Interfaces/models/media";
import ITranslation from "Interfaces/models/translation";
import IAddress from "Interfaces/models/address";
import IContact from "Interfaces/models/contact";
import Amenities from "Utils/enums/amenities";

interface IHotel {
  _id: string;
  hotelId: string;
  chainCode: string;
  brandCode?: string;
  dupeId?: string;
  name: string;
  rating: string;
  description?: [ITranslation];
  amenities?: Amenities[];
  media?: [IMedia];
  cityCode?: string;
  latitude?: number;
  longitude?: number;
  address?: IAddress;
  contact?: IContact;
}

export default IHotel;
