import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlanModule } from './plan/plan.module';
import { MembersModule } from './members/members.module';
import { AffiliatesModule } from './affiliates/affiliates.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    PlanModule,
    MembersModule,
    AffiliatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
