import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { email, name } = request.body;

    if(!email) {
      return response.status(400).json({ error: "Email is required" });
    }

    if(!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    try {
      const newUser = this.createUserUseCase.execute({ email, name });

      const useFormattedForResponse = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        admin: newUser.admin,
      };

      return response.status(201).json(useFormattedForResponse);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { CreateUserController };
