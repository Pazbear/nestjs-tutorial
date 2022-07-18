import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

//다른 모듈에서도 사용가능하도록
@Injectable()
//기본전략을 passport-jwt의 Strategy로 설정
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //어디에서 jwt토큰을 추출할 것인지
    });
  }

  async validate(payload): Promise<User> {
    const { userId } = payload;
    const user: User = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
