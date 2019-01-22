const express = require("express");

const linkedinCtl = require("./controllers/linkedin.ctl");
const unsplashCtl = require("./controllers/unsplash.ctl");
const profileCtl = require("./controllers/profile.ctl");
const middlewares = require("./controllers/middlewares");
const app = express();
const port = process.env.PORT || 3000;
app.set("port", port);

app.use("/", express.static("./public")); // for API

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept"
  );
  res.set("Content-Type", "application/json");
  next();
});

/*** All routes ***/
app.get("/authorize", linkedinCtl.linkedinConnect);

app.get("/showProfile", profileCtl.showProfile);
app.get(
  "/callback",
  middlewares.getAccessCode,
  middlewares.setAccessToken,
  linkedinCtl.callback
);
app.get("/questions", unsplashCtl.getphotos);

app.listen(port, () => console.log(`listening on port ${port}`));
