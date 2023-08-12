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

      if(request.body.completed_at) {
        return response.writeHead(400).end("completed_at must be empty")
      }

      request.body.completed_at = null

      const task = {
        id: randomUUID(),
        ...request.body
      }

      database.insert('tasks', task)

      return response.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: getRoutePath('/tasks/:id'),
    handler: (request, response) => {

      const { id } = request.params
      const { title, description } = request.body

      const new_task = {
        id,
        title,
        description,
        update_at: new Date().toISOString(),
        completed_at: null
      }

      database.update('tasks', id, new_task)

      return response.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: getRoutePath('/tasks/:id/complete'),
    handler: (request, response) => {

    }
  },
  {
    method: 'DELETE',
    path: getRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { id } = request.params

      database.delete('tasks', id)

      return response.writeHead(204).end()
    }
  },
]
