import { getRoutePath } from "./utils/getRoutePath.js";

export const routes = [
  {
    method: 'GET',
    path: getRoutePath('/tasks'),
    handler: (request, response) => {

    }
  },
  {
    method: 'POST',
    path: getRoutePath('/tasks'),
    handler: (request, response) => {

    }
  },
  {
    method: 'PUT',
    path: getRoutePath('/tasks'),
    handler: (request, response) => {

    }
  },
  {
    method: 'PATCH',
    path: getRoutePath('/tasks'),
    handler: (request, response) => {

    }
  },
  {
    method: 'DELETE',
    path: getRoutePath('/tasks'),
    handler: (request, response) => {

    }
  },
]
