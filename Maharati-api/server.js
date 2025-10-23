const app = require("./src/configuration/config.js");
const PORT = process.env.PORT || 3000;

require("dotenv").config();
const passportSetup = require("./passport.js");

const bodyParser = require("body-parser");

// Set limit for body-parser
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//     parameterLimit: 10000,
//     limit: "50mb",
//   })
// );
// app.use(bodyParser.json({ limit: "50mb" }));

// app.use((req, res, next) => {
//   console.log("Incoming request:");
//   console.log("Headers:", req.headers);
//   console.log("Body:", req.body);
//   next();
// });
app.use((req, res, next) => {
  req.setTimeout(600000); // 600,000 ms = 10 minutes
  res.setTimeout(600000);
  next();
});
// Routes
const authRoute = require("./src/routes/authRoute.js");
const userRoute = require("./src/routes/userRoute.js");
const courseRoute = require("./src/routes/courseRoute.js");
const evaluationRoute = require("./src/routes/evaluationRoute.js");
const refreshRoute = require("./src/routes/refreshRoute.js");
const calendarRoute = require("./src/routes/calendarRoute.js");
const supportRoute = require("./src/routes/supportRoute.js");
const auditRoute = require("./src/routes/auditRoute.js");
const mailRoute = require("./src/routes/mailRoute.js");
const notiRoute = require("./src/routes/notifRoute.js");
const elementRoute = require("./src/routes/elementRoute.js");
const propertyRoute = require("./src/routes/propertyRoute.js");
const { AI } = require("./geminiAPI.js");
const testFinalRoutes = require("./src/routes/TestFinalRoutes");

app.use("/ask-ai", AI);
app.use("/", authRoute);
app.use("/elements", elementRoute);
app.use("/properties", propertyRoute);
app.use("/compose-mail", mailRoute);
app.use("/support", supportRoute);
app.use("/notifications", notiRoute);
app.use("/audits", auditRoute);
app.use("/calendar", calendarRoute);
app.use("/users", userRoute);
app.use("/courses", courseRoute);
app.use("/evaluations", evaluationRoute);
app.use("/refresh-token", refreshRoute);
app.use("/testfinals", testFinalRoutes);

app.listen(PORT, () => {
  console.log("Server running on Port ", PORT);
});
