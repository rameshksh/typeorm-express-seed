import {
  controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import { User } from '../entity/user';
import { UserService } from '../services/UserService';
import TYPES from '../constants/types';

@controller('/api/users')
export class UserController extends BaseHttpController {
  @inject(TYPES.UserService) private readonly _userService: UserService;

  constructor() {
    super();
  }

  @httpGet('/')
  public getUsers(): Promise<User[]> {
    return this._userService.getUsers();
  }

  @httpGet('/:id')
  public getUser(request: Request): Promise<User> {
    return this._userService.getUser(request.params.id);
  }

  @httpPost('/')
  public newUser(request: Request): Promise<User> {
    return this._userService.newUser(request.body);
  }

  @httpPut('/:id')
  public updateUser(request: Request): Promise<User> {
    return this._userService.updateUser(request.params.id, request.body);
  }

  @httpDelete('/:id')
  public deleteUser(request: Request): Promise<any> {
    return this._userService.deleteUser(request.params.id);
  }
}