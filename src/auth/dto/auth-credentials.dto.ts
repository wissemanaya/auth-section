import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{
    @IsString()                              //informations of connection per user
    @MinLength(4)
    @MaxLength(20)
    username: string ;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message:'password is weak',})  //reg exp verify strong password

    password: string ;
}