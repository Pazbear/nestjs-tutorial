import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { DeleteResult, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(
    user: User,
    createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    const { title, desc } = createBoardDto;
    const board = this.create({
      title,
      desc,
      status: BoardStatus.PUBLIC,
      user,
    });
    await this.save(board);
    return board;
  }
}
