import { randomUUID } from "crypto";
import { getRoutePath } from "./utils/getRoutePath.js";
import { Database } from "./database.js";

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: getRoutePath('/tasks'),
    handler: (request, response) => {
      const tasks = database.select('tasks')

      return response.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: getRoutePath('/tasks'),
    handler: (request, response) => {
      request.body.completed_at = null

      const task = {
        id: randomUUID(),
        ...request.body
      }

      database.insert('task', task)

      return response.writeHead(201).end()
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
