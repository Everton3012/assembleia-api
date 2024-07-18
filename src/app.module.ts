import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PautasModule } from './pautas/pautas.module';

@Module({
  imports: [DatabaseModule, PautasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
