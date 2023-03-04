import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const currentUser = this.usersRepository.findById(user_id);
    let allUsers = null;

    if (!currentUser) {
      throw new Error("User not found");
    }

    if (currentUser?.admin !== true) {
      throw new Error("User not have permission to see list of users");
    }

    if (currentUser?.admin === true) {
      allUsers = this.usersRepository.list();
    }

    return allUsers;
  }
}

export { ListAllUsersUseCase };
