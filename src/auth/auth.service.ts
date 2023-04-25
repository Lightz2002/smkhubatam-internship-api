import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(Username: string, Password: string): Promise<any> {
    const user = await this.usersService.findByUsername(Username);
    if (user && (await bcrypt.compare(Password, user.Password))) {
      const { Password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.Username,
      sub: user.Id,
      role: user.Role,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        privateKey: jwtConstants.secret,
        // expiresIn: '600s',
      }),
    };
  }
}
