import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { from } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwt(user) {
    return from(this.jwtService.signAsync({ user }));
  }

  comparePasswords(password: string, storedPasswordHash: string) {
    return bcrypt.compare(password, storedPasswordHash);
  }
}
