import { fridgeApi } from "../Hosts";
import BaseHttpService from "./HttpServiceBase";

const GetAllFridges = async () =>
  await BaseHttpService(`${fridgeApi}/api/fridges`);

export default GetAllFridges;
