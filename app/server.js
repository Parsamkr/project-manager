module.exports = class Application {
  #express = require("express");
  #app = this.#express();

  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createServer(PORT);
    this.createRoutes();
    this.errorHandler();
  }
  configApplication() {
    const path = require("path");
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
  }
  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(PORT, () => {
      console.log(`server run on port : http://localhost:${PORT}`);
    });
  }
  configDatabase(DB_URL) {
    const mongoose = require("mongoose");
    mongoose.set("strictQuery", true);

    mongoose.connect(DB_URL).catch((error) => {
      if (error) throw error;
      return console.log("Successfully Connected to DB ...");
    });
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "Route doesn't exist" });
    });

    this.#app.use((error, req, res, next) => {
      const status = error?.status || 500;
      const message = error?.message || "InternalServerError";
      return res.status(status).json({ status, success: false, message });
    });
  }
  createRoutes() {
    this.#app.get("/", (req, res, next) => {
      return res.json({ message: "this a new application" });
    });
  }
};
