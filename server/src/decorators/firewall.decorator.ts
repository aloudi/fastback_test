import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

export function Firewall() {
  const guards = [JwtAuthGuard];
  return applyDecorators(UseGuards(...guards));
}
