import { Request, Response } from "express";

type Todo = {
  id: number;
  text: string;
  createdAt: Date;
  completedAt?: Date | null;
};

const todos: Todo[] = [
  {
    id: 1,
    text: "Buy milk",
    createdAt: new Date(),
  },
  {
    id: 2,
    text: "Buy bread",
    createdAt: new Date(),
  },
  {
    id: 3,
    text: "Buy butter",
    createdAt: new Date(),
  },
];

export class TodosController {
  //* DI
  constructor() {}
  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: `ID argument is not a number` });
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return res.status(404).json({ error: `TODO with id ${id} not found` });
    }

    return res.json(todo);
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ error: "Text property is required" });

    const newTodo = {
      id: todos.length + 1,
      text,
      createdAt: new Date(),
    };

    todos.push(newTodo);

    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: `ID argument is not a number` });

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return res.status(404).json({ error: `TODO with id ${id} not found` });
    }

    const { text, completedAt } = req.body;

    todo.text = text ?? todo.text;
    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt ?? todo.completedAt));

    //! OJO, referencia

    res.json(todo);
  };

  // This can be a soft or hard delete
  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: `ID argument is not a number` });

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return res.status(404).json({ error: `TODO with id ${id} not found` });
    }

    const indexToDelete = todos.findIndex((todoF) => todoF.id === todo.id)

    console.log(indexToDelete)

    todos.splice(indexToDelete, 1)

    res.json(todo)

  };
}
