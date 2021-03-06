import { Body, Controller,Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService} from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

@Post('/signup')
signUp(@Body() authCredentialsDto:AuthCredentialsDto): Promise<void> {               //signUp
    return this.authService.signUp(authCredentialsDto);

}
@Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {                  // return a token fo sucsessful signin                                               //signIn
    return this.authService.signIn(authCredentialsDto);
}





}
