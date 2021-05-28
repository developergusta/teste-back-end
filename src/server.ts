import express from 'express';
import { routes } from './routes';
import './database'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'


const port = process.env.PORT || 3333;

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "CRUD API",
            version: "1.0.0",
            description: "A Simple CRUD API",
            contact: {
                name: 'Gustavo Oliveira'
            }
        },
        servers: ["http://localhost:3333"]
    },
    apis:["./routes.ts"]
}

const specs = swaggerJSDoc(swaggerOptions)

app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
});