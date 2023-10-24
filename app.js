const express = require('express');
const cors = require('cors');
const applicationRouter = require('./routes/application.route');
const authRouter = require('./routes/auth.route');
const jobRouter = require('./routes/job.route');
const userRouter = require('./routes/user.route');
const authenticateToken = require('./middleware/authResponse');
const cookieSession = require("cookie-session");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "recruitment-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
    sameSite: 'strict'
  })
);

const db = require("./models");
db.sequelize.sync();

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to recruitment application." });
  next();
});

require("./routes/auth.route")(app);
require("./routes/user.route")(app);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
});

app.use('/api', authenticateToken);
app.use('/application', applicationRouter);
app.use('/auth', authRouter);
app.use('/job', jobRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});