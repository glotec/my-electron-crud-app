import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TasksDto {
  @IsInt()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
    category_id: any;
    designation: any;
}
