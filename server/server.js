import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
