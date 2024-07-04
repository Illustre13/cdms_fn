import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const baseURL = process.env.CDMS_BACKEND_SERVER_URL;
const baseURL = "http://localhost:4005/api/cdms";
const URL = axios.create({
	baseURL,
});
export default URL;
