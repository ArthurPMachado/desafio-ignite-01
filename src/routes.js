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

      const { body } = request

      if(!body.title || !body.description) {
        return response.writeHead(400).end(JSON.stringify('Title and description are mandatory'))
      }

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

      const { body } = request

      if(!body.title || !body.description) {
        return response.writeHead(400).end(JSON.stringify('Title and/or description are mandatory'))
      }

      const { id } = request.params
      const { title, description } = body

      const new_task = {
        id,
        title,
        description,
        completed_at: null
      }

      const isDataNotFound = database.update('tasks', id, new_task)

      if(isDataNotFound) {
        return response.writeHead(200).end("Task not found on database")
      }

      return response.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: getRoutePath('/tasks/:id/complete'),
    handler: (request, response) => {
      const { id } = request.params

      const isDataNotFound = database.updateCompletion('tasks', id)

      if(isDataNotFound) {
        return response.writeHead(200).end("Task not found on database")
      }

      return response.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: getRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { id } = request.params

      const isDataNotFound = database.delete('tasks', id)

      if(isDataNotFound) {
        return response.writeHead(200).end("Task not found on database")
      }

      return response.writeHead(204).end()
    }
  },
]
