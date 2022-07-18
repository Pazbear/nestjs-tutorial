import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { BoardStatus } from './board.model';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardsRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardsRepository.find();
  }

  async getMyBoards(user: User): Promise<Board[]> {
    return await this.boardsRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    /*
    QUERY BUILDER 사용으로 복잡한 쿼리 또한 처리 가능
    const query = this.boardsRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
    */
  }

  async getBoardById(id: number): Promise<Board> {
    const foundBoard = await this.boardsRepository.findOneBy({ id });
    if (!foundBoard) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return foundBoard;
  }

  createBoard(user: User, createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsRepository.createBoard(user, createBoardDto);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardsRepository.save(board);
    return board;
  }

  //삭제 시
  /*
  Remove(): 삭제 시 데이터가 존재하지 않으면 404 에러를 냄
  Delete(): 삭제 시 데이터가 존재하지 않으면 아무일도 하지 않음
  */
  async deleteBoard(user: User, id: number): Promise<void> {
    const result = await this.boardsRepository.delete({
      id,
      user: { id: user.id },
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }
}
