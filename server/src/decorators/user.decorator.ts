import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDTO } from 'src/modules/users/types';

export const User: () => ParameterDecorator = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return (request.user as UserDTO) || null;
  },
);
