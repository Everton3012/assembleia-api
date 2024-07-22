import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import {
  CriarPautaResource,
  toDomain,
  toRepresentation,
} from './pautas.ressource';
import { Pauta } from './pauta.entity';
import { ErrorResponse } from 'src/common/error.resource';

@Controller('pautas')
export class PautasController {
  constructor(private readonly service: PautasService) {}

  @Post()
  async save(@Body() pauta: CriarPautaResource, @Res() res: Response) {
    const pautaDomain: Pauta = toDomain(pauta);
    const result = await this.service.save(pautaDomain);

    if (result.isError()) {
      return res
        .status(HttpStatus.CONFLICT)
        .send(new ErrorResponse(result.error.message));
    }

    return res.status(HttpStatus.CREATED).send(toRepresentation(result.value));
  }
}
