
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { user } from './user.entity';
    //to guard entire tasks controller 
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): user => {const req = ctx.switchToHttp().getRequest()
    return req.user;
  },
);