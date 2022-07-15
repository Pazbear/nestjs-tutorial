import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password });
    await this.save(user);
  }
}