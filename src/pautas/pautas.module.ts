import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PautasService } from './pautas.service';
import { pautaProviders } from './pauta.providers';

@Module({
  imports: [DatabaseModule],
  providers: [PautasService, ...pautaProviders],
})
export class PautasModule {}
