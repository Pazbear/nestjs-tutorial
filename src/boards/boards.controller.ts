import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Board } from './board.entity';
import { BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  private logger = new Logger('BoardsController');
  //접근 제한자 사용 시 클래스 프로퍼티로 인정됨
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  GetAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/my')
  @UseGuards(AuthGuard())
  GetMyBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(
      `유저 ${user.username}가 my boards를 가져오려고 시도 중입니다.`,
    );
    return this.boardsService.getMyBoards(user);
  }

  @Get('/:id')
  GetBoard(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post('/')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe) //PIPE === MIDDLEWARE
  createBoard(
    @GetUser() user: User,
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    this.logger.verbose(`유저 ${user.username}가 새 board를 생성중입니다.
    페이로드: ${JSON.stringify(createBoardDto)}`);
    return this.boardsService.createBoard(user, createBoardDto);
  }

  @Patch('/:id/status')
  @UseGuards(AuthGuard())
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteBoard(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.boardsService.deleteBoard(user, id);
  }
}
