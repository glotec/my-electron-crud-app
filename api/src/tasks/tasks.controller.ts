import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksDto } from './dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post('create')
  create(@Body() dto: TasksDto) {
    return this.taskService.create(dto);
  }

  @Get('all')
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param(':id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param(':id') id: string, dto: TasksDto) {
    return this.taskService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param(':id') id: string) {
    return this.taskService.remove(id);
  }
}
