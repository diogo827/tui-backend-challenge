import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import IController from "./interfaces/generics/controller";
import errorMiddleware from "./middleware/error";

class App {
  public app: express.Application;

  constructor(controllers: IController[]) {
    this.app = express();
    this.connectToDB();
    this.initMiddlewares();
    this.initControllers(controllers);
    this.initErrorHandling();
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      // tslint:disable-next-line:no-console
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private initMiddlewares() {
    this.app.use(bodyParser.json()); // application/json
    this.app.use(cors());
  }

  private initErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initControllers(controllers: IController[]) {
    controllers.forEach((controller) => this.app.use("/", controller.router));
  }

  private connectToDB() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }
}

export default App;
