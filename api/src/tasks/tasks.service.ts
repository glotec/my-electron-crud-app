import { ForbiddenException, Injectable } from '@nestjs/common';
import { TasksDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: TasksDto) {
    try {
      const tsk = await this.prismaService.task.create({
        data: {
          id: dto.id,
          title: dto.title,
          description: dto.description,
        },
      });
      if (tsk) {
        return {
          statusCode: 201,
          message: 'Task added',
          tsk,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Erreur survenu');
        }
        throw error;
      }
    }
  }

  async findAll() {
    try {
      const [tsk, count] = await Promise.all([
        this.prismaService.task.findMany(),
        this.prismaService.task.count(),
      ]);
      return {
        statusCode: 200,
        message: 'Tasks',
        count: count,
        task: tsk,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Erreur survenu');
        }
        throw error;
      }
    }
  }

  async findOne(id: string) {
    try {
      const tsk = await this.prismaService.task.findUnique({
        where: { id },
      });
      if (tsk) {
        return {
          statusCode: 200,
          message: 'Task',
          tsk,
        };
      }

      return {
        statusCode: 404,
        message: "Ce category n'existe ps !",
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Erreur survenu');
        }
        throw error;
      }
    }
  }

  async update(id: string, dto: TasksDto) {
    try {
      const tsk = await this.prismaService.task.update({
        where: { id },
        data: {
          id: id,
          title: dto.title,
          description: dto.description,
        },
      });
      if (tsk) {
        return {
          statusCode: 201,
          message: 'task updated',
          tsk,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Erreur survenu');
        }
        throw error;
      }
    }
  }

  async remove(id: string) {
    try {
      const deletetsk = await this.prismaService.task.delete({
        where: { id },
      });
      if (deletetsk) {
        return {
          statusCode: 200,
          message: 'task deleted',
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Erreur survenu');
        }
        throw error;
      }
    }
  }
}
