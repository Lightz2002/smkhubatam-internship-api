import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(Username: string, Password: string): Promise<any> {
    const user = await this.usersService.findByUsername(Username);
    if (user && user.Password === Password) {
      const { Password, ...result } = user;
      console.log('authservice: ', result);
      return result.Id;
    }

    return null;
  }

  async login(user: any) {
    const payload = { Username: user.Username, sub: user.Id };

    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }
}
