import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ConflictResponseModel } from 'src/common/responses/conflict.response.model';
import { TokenResponseModel } from 'src/common/responses/token.response.model';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  @ApiCreatedResponse({ description: 'User created' })
  @ApiConflictResponse({ description: 'User already exist', type: ConflictResponseModel })
  public signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signIn')
  @HttpCode(200)
  @ApiOkResponse({ description: 'User authenticated', type: TokenResponseModel })
  public signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
