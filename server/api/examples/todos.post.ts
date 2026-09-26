import { todoCreateSchema } from '#shared/schemas/todo'

// POST /api/examples/todos — validates the body with the shared Zod schema.
// Invalid input automatically returns a 400 with the validation issues.
export default defineEventHandler(async (event) => {
  const { title } = await readValidatedBody(event, todoCreateSchema.parse)

  setResponseStatus(event, 201)
  return addExampleTodo(title)
})
