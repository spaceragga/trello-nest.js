import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { BoardsModule } from './boards/boards.module';
import { HttpErrorFilter } from './errors/http-error.filter';
import { APP_FILTER } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TasksModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    AppService,
  ],
})
export class AppModule {}
