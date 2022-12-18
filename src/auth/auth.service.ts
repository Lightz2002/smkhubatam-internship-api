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
    const saltOrRounds = 10;
    if (
      user &&
      bcrypt.compare(user.Password, await bcrypt.hash(Password, saltOrRounds))
    ) {
      const { Password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.Username, sub: user.Id };

    return {
      access_token: this.jwtService.sign(payload, {
        privateKey: jwtConstants.secret,
        // expiresIn: '600s',
      }),
    };
  }
}
