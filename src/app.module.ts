import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, BoardsModule],
})
export class AppModule {}
