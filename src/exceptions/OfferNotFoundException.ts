import HttpException from "./HttpException";

class OfferNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Offer with id ${id} not found.`);
  }
}

export default OfferNotFoundException;
