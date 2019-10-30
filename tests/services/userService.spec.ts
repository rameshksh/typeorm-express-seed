import * as typeorm from 'typeorm'
import { createSandbox, SinonSandbox, createStubInstance } from 'sinon'
import { deepEqual } from 'assert'
import { UserService } from '../../src/services/UserService'
import { User } from '../../src/entity/user'

describe('mocha => typeorm => getManager', () => {
  let sandbox: SinonSandbox;
  let user: User;

  beforeEach(() => {
    sandbox = createSandbox()
  });

  afterEach(() => {
    sandbox.restore()
  });

  it('getAll method passed', async () => {
   
    const fakeRepository = createStubInstance(typeorm.Repository);
    const fakeConnection = createStubInstance(typeorm.Connection)
    fakeConnection.getRepository.withArgs(User).returns(fakeRepository as any);

    sandbox.stub(typeorm, 'getRepository').returns(fakeRepository as any);

    const userService = new UserService();

    const result = await userService.getUsers();
    
    deepEqual(result, [user])
  });
})