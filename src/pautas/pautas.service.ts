import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pauta } from './pauta.entity';

@Injectable()
export class PautasService {
  constructor(
    @Inject('PAUTA_REPOSITORY')
    private readonly pautaRepository: Repository<Pauta>,
  ) {}
}
