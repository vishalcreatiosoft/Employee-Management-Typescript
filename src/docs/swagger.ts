import { Express, Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from "swagger-jsdoc";
const version = '1.0.0'

const options: swaggerJsdoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "REST API Docs",
        version,
        description : "REST API Documentation"
      },
      tags:[
          {
              "name" : "Employee Management System"
          }
      ],
    },
    apis: ["./src/routes/*.ts", "./src/schema/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

}

export default swaggerDocs;

