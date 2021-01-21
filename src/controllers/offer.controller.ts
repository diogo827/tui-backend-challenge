import OfferNotFoundException from "Exceptions/OfferNotFoundException";
import { Router, Request, Response, NextFunction } from "express";
import IController from "Interfaces/generics/controller";
import offerModel from "Models/offer";
import weatherForecastModel from "Models/weather-forecast";

class OfferController implements IController {
  public path = "/offers";
  public router = Router();
  private offer = offerModel;
  private weatherForecast = weatherForecastModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllOffers);
    this.router.get(`${this.path}/:id`, this.getOfferById);
  }

  private getAllOffers = async (request: Request, response: Response) => {
    const page: number = isNaN(+request.query.page)
      ? 1
      : parseInt(request.query.page.toString(), 10);
    const pageSize: number = isNaN(+request.query.pageSize)
      ? 20
      : parseInt(request.query.pageSize.toString(), 10);
    const offers = await this.offer
      .find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate("hotel");
    response.send(offers);
  };

  private getOfferById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const offer = await this.offer.findById(id).populate("hotel");
    if (offer) {
      // Get Hotel Coordinates
      const hotelCoordinates = offer.hotel.coordinates;
      // Get Offer check in and checkout dates
      const checkInDate = offer.checkInDate;
      const checkOutDate = offer.checkOutDate;
      // Search Weather
      const weather = this.weatherForecast.find({
        $and: [
          { date: { $gte: checkInDate } },
          { date: { $lte: checkOutDate } },
          {
            location: {
              $near: {
                $maxDistance: 5,
                $geometry: { type: "Point", coordinates: [hotelCoordinates] },
              },
            },
          },
        ],
      });
      response.send({ offer, weatherForecast: weather });
    } else {
      next(new OfferNotFoundException(id));
    }
  };
}

export default OfferController;
