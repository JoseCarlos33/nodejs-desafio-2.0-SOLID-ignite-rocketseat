/* eslint-disable prettier/prettier */
import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";
import { v4 as uuidV4 } from "uuid";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User()

    Object.assign(newUser, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const existentUser = this.users.find(user => user.id === id);

    return existentUser;
  }

  findByEmail(email: string): User | undefined {
    const existentUser = this.users.find(user => user.email === email);

    return existentUser;
  }

  turnAdmin(receivedUser: User): User {
    const formattedUsers = this.users.map(user => user.id === receivedUser.id ? { ...user, admin: true} : user);
    this.users = formattedUsers;
    const currentUser = this.users.find(user => user.id === receivedUser.id);

    return currentUser;
  }

  list(): User[] {
    const all = this.users;
    return all;
  }
}

export { UsersRepository };
