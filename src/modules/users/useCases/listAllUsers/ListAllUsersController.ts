import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    if (typeof user_id !== "string") {
      return response.status(400).json({ error: "user_id must be a string" });
    }

    try {
      const allUsers = this.listAllUsersUseCase.execute({ user_id });

      return response.status(201).json(allUsers);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { ListAllUsersController };
