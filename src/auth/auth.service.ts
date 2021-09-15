import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.payload.interface';
@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository, private jwtService: JwtService) {}

  public signUp = async (authCrendentialsDto: AuthCredentialsDto): Promise<void> => {
    return this.usersRepository.createUser(authCrendentialsDto);
  };

  public signIn = async (authCredentials: AuthCredentialsDto): Promise<{ accessToken: string }> => {
    const { username, password } = authCredentials;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Wrong user credentials');
    }
  };
}
