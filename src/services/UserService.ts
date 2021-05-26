import { getCustomRepository, Repository } from "typeorm";
import { IUserCreate } from "../interfaces/IUserCreate";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";


export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async create({ birth_date, email, first_name, last_name, nick_name, password, phone_number }: IUserCreate) {
    const userExisting = await this.userRepository.findOne({
      email,
    });

    if (userExisting) {
      return userExisting;
    }

    const user = this.userRepository.create({
      birth_date,
      email,
      first_name,
      last_name,
      nick_name,
      password,
      phone_number,
    });

    await this.userRepository.save(user);

    return user;
  }

  async list(){
    const users = await this.userRepository.find();

    return users;
  }

  async findByUserId(user_id: string){
    return await this.userRepository.findOne({
      user_id,
    });
  }

  async update(user_id: string, { birth_date, email, first_name, last_name, nick_name, password, phone_number }: IUserCreate){
    const userExisting = await this.findUser(user_id)

    if (!userExisting) {
      return false;
    }

    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({birth_date, email, first_name, last_name, nick_name, password, phone_number})
      .where("user_id = :user_id", {
        user_id,
      })
      .execute();

  }

  async delete(user_id: string){
    const userExisting = await this.findUser(user_id)

    if (!userExisting) {
      return false;
    }

    await this.userRepository.delete(user_id);

    return true;
  }

  async findUser(user_id: string): Promise<any>{
    const userExisting = await this.userRepository.findOne(user_id)

    if (userExisting) {
      return userExisting;
    }
    else{
      return false;
    }
  }
}