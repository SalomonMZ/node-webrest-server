import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/todos";

type Todo = {
  id: number;
  text: string;
  createdAt: Date;
  completedAt?: Date | null;
};

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: `ID argument is not a number` });
    // const todo = todos.find((todo) => todo.id === id);
    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      return res.status(404).json({ error: `TODO with id ${id} not found` });
    }

    return res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)
    if (error)
      return res.status(400).json({ error});

    // ! Esta acoplado a directamente usar prisma
    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updatedTodoDto] = UpdateTodoDto.create({...req.body, id})

    if(error) return res.status(400).json({error})

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      return res.status(404).json({ error: `TODO with id ${id} not found` });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updatedTodoDto!.values,
    });

    res.json(updatedTodo);
  };

  // * This can be a soft or hard delete
  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: `ID argument is not a number` });

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      return res.status(404).json({ error: `TODO with id ${id} not found` });
    }

    const deletedTodo = await prisma.todo.delete({ where: { id } });

    (deletedTodo)
    ? res.json(deletedTodo)
    : res.status(400).json({error: `Todo with id ${id} not found`})

  };
}
