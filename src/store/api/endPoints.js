import { baseURL } from "../../Helpers/const/const";

export const publicEndpoints = new Map([
  ["landingEndpoint", `${baseURL}/machines/public`],
  ["publicMachinesByPageEndpoint", `${baseURL}/machines/public`],
  ["loginEndpoint", `${baseURL}/login`],
  ["registerEndpoint", `${baseURL}/register`],
  ["categoriesPublicEndpoint", `${baseURL}/categories`],
  ["machineDetailsEndpoint", `${baseURL}/machines/public`],
]);

export const privateEndpoints = new Map([
  ["PrivateMachinesEndpoint", `${baseURL}/machines`],
  ["bookingsEndpoint", `${baseURL}/bookings`],
  ["profileEndpoint", `${baseURL}/profile`],
  ["profileUpdateEndpoint", `${baseURL}/profile/update`],
  ["changePasswordEndpoint", `${baseURL}/change-password`],
  ["categoriesEndpoint", `${baseURL}/categories`],
  ["statisticsEndpoint", `${baseURL}/statistics`],
  ["usersEndpoint", `${baseURL}/users`],
  ["subCategoriesEndpoint", `${baseURL}/sub-categories`],
]);
