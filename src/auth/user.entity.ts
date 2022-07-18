import { type } from 'os';
import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username']) //데이터베이스에 같은 값이 있을 경우 에러 발생 => 에러는 repository에서 try~catch 문으로 제어 가능
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Board, (board) => board.user, { eager: true })
  //eager : true 일 경우 유저정보를 가져올 때 board 정보도 가져옴
  boards: Board[];
}
