import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  //영어와 숫자 및 !, @, # 만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9|!|@|#]/, {
    message: '영어, 숫자, !, @, # 만 입력 가능합니다.',
  })
  password: string;
}
