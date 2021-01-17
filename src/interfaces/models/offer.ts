import IRoomDetails from "./room-details";
import ITranslatableContent from "./translatable-content";

interface IOffer {
  _id: string;
  hotelId: string;
  checkInDate?: number;
  checkOutDate?: number;
  roomQuantity?: number;
  rateCode: string;
  rateFamilyEstimated?: { code: string; type: string };
  category?: string;
  description?: [ITranslatableContent];
  room: IRoomDetails;
  guests: { adults: number; childAges: number };
  price: { currency: string; total: string; base: string };
}

export default IOffer;
