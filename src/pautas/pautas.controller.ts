import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import {
  CriarPautaResource,
  NovaSessaoResource,
  toDomain,
  toRepresentation,
} from './pautas.resource';
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

  @Get()
  async list(@Res() res: Response) {
    const result = await this.service.findAll();
    return res.status(HttpStatus.OK).send(result.map(toRepresentation));
  }

  @Post(':id/sessao')
  async criarSessao(
    @Param('id') id: string,
    @Body() resource: NovaSessaoResource,
    @Res() res: Response,
  ) {
    const pauta: Pauta = await this.service.findById(id);

    if (!pauta)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(new ErrorResponse('Pauta não encontrada.'));

    const sucesso = await this.service.iniciarSessao(pauta, resource.minutos);

    if (sucesso) return res.status(HttpStatus.OK).send();

    const errorResponse = new ErrorResponse(
      'Não foi possivel iniciar a sessão para esta pauta, sua sessão já foi iniciada ou encerrada',
    );

    return res.status(HttpStatus.CONFLICT).send(errorResponse);
  }
}
