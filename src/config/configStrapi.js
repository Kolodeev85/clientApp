import axios from "axios";
import qs from "qs";

const baseUrl = process.env.REACT_APP_STRAPI_API_URL;
export const strapiRestClient = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) =>
    qs.stringify(params, { encodeValuesOnly: true }),
});

export const STRAPI_API_ROUTES = {
  AREAS: "/areas",
  PUBLISHERS: "/publishers",
  EVENTS: "/events",
  GROUPS: "/groups",
  SUBGRUPS: "/subgroups",
  SUBEVENTS: "/subevents",
  HISTORIES: "/histories",
};
