import { JwtModule } from '@nestjs/jwt';

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'secret',
  signOptions: { expiresIn: '1h' },
};