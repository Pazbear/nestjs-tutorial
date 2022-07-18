import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//환경변수를 위한 모듈
@Module({
  imports: [ConfigModule.forRoot({})],
})
export class ConfigurationModule {}
