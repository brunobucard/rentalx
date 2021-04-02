import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    //Usuario existe?
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    //senha esta correta?
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    //Gerar jsonwebtoken
    const token = sign({}, "cfe275a5908b5650488e0b0342c2d6cc", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
        token,
        user: {
            name: user.name,
            email: user.email
        }
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };