import { Controller, Get } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  //접근 제한자 사용 시 클래스 프로퍼티로 인정됨
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  GetAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }
}
