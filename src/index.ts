import "reflect-metadata";
import { createConnection } from "typeorm";
import { UserService } from "./services/UserService";
import * as bodyParser from 'body-parser';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

// declare metadata by @controller annotation
import "./controllers/UserController";
import TYPES from "./constants/types";

// connection settings are in the "ormconfig.json" file
createConnection().then(async connection => {
    buildServer()
}).catch(error => console.log("TypeORM connection error: ", error));

function buildServer() {

    // set up container
    let container = new Container();

    // set up bindings
    container.bind<UserService>(TYPES.UserService).to(UserService);

    // create server
    let server = new InversifyExpressServer(container);

    server.setConfig((app) => {
        // add body parser
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.use(bodyParser.json());

        console.log("Express application is up and running on port 3000...");
    }).build().listen(3000);  

    console.log("Database Connection succesful...");
}
