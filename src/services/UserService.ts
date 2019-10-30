import { injectable } from 'inversify';
import { User } from '../entity/user';
import { Repository, getManager } from 'typeorm';
import { getConnectionManager } from 'typeorm';

@injectable()
export class UserService {  
  
  private repository: Repository<User>;

  constructor(
  ) {
    this.repository = getManager().getRepository(User);
  }

  public getUsers(): Promise<User[]> {
    return this.repository.find();
  }

  public getUser(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  public newUser(user: User): Promise<User> {
    return this.repository.save(user);
  }

  public async updateUser(id: string, user: User): Promise<User> {
    let toUpdate = await this.repository.findOne(id);
    let updated = Object.assign(toUpdate, user);
    return this.repository.save(updated);
  }

  public async deleteUser(id: string): Promise<any> {
    let toDelete = await this.repository.findOne(id);
    return this.repository.delete(toDelete);
  }
}