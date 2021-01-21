import OfferController from "Controllers/offer.controller";
import "dotenv/config";
import App from "./app";

const app = new App([new OfferController()]);

app.listen();
