import express from "express";
import sourceMapSupport from 'source-map-support';
import cors from "cors";
import sessions from "./routes/session.js";

sourceMapSupport.install();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/session", sessions);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
