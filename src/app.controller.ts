import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly appService: AppService,
  ) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: CreateUserDto) {
    return this.usersService.login(loginUserDto).then(
      map((jwt: string) => ({
        token: jwt,
        token_type: 'JWT',
        expires_in: 10000,
      })),
    );
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
