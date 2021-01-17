interface IOffer {
  _id: string;
  checkInDate?: number;
  checkOutDate?: number;
  roomQuantity?: number;
  rateCode: string;
  rateFamilyEstimated?: { code: string; type: string };
  category?: string;
}

export default IOffer;
