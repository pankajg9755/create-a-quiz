import fetch from "node-fetch";
import express from "express";
import parser from "body-parser";
import cors from "cors";
import dotenv, { config } from "dotenv";
import helmet from "helmet";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';
import Constant from "./constants/constant.js";
import httpConstants from "./constants/http.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(parser.json({ type: "application/json" }));
app.use(parser.json({ limit: "10mb" }));
app.use(parser.urlencoded({ limit: "10mb", extended: true }));
app.use(compression());
app.use(
  cors({
    origin: "*",
    exposeHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Content-disposition",
    ],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Content-disposition",
      "Access-Control-Allow-Origin",
    ],
  })
);

app.use(helmet());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.json({
      status: httpConstants.HTTP_BAD_REQUEST,
      error: [{ msg: Constant.massage.inValidJson }],
    });
  }
  // Handle other errors
  res.json({
    status: httpConstants.HTTP_INTERNAL_SERVER_ERROR,
    error: Constant.massage.internalServerError,
  });
});

app.use("/public", express.static("public"));

// Import and use your route files directly here
import userRoutes from "./routes/userAuth.js";
import quizRoutes from "./routes/quizRoutes.js";
app.use("/api/quiz", quizRoutes);
app.use("/api/user", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  if (err.code === "ETIMEDOUT") {
    // Handle timeout error
    res.status(504).send("Request timed out");
  } else {
    // Handle other errors
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerFilePath = path.join(__dirname, 'swagger', 'swagger.json');

console.log(`Attempting to read the file at: ${swaggerFilePath}`);

// Read the JSON file
const swaggerDoc = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

// Setup Swagger UI

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
const filePath = path.join(__dirname, 'swagger', 'swagger.json');

// Read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
  } else {
    console.log('File content:', JSON.parse(data));
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
