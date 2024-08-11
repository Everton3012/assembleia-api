import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { PautasService } from 'src/pautas/pautas.service';
import { VotoService } from './voto.service';
import { RegistroVotoResource } from './voto.resource';
import { Response } from 'express';
import { ErrorResponse } from 'src/common/error.resource';

@Controller('pautas/:id/voto')
export class VotoController {
  constructor(
    private readonly pautasService: PautasService,
    private readonly votoService: VotoService,
  ) {}

  @Post()
  async registrarVoto(
    @Param('id') idPauta: string,
    @Body() resouce: RegistroVotoResource,
    @Res() res: Response,
  ) {
    const pauta = await this.pautasService.findById(idPauta);

    if (!pauta) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(new ErrorResponse('Pauta não encontrada'));
    }
    const result = await this.votoService.registarVoto(
      pauta,
      resouce.cpf,
      resouce.opacaoVoto,
    );

    if (result.isError()) {
      const error = result.error;
      return res.status(error.status).send(new ErrorResponse(error.message));
    }

    return res.status(HttpStatus.ACCEPTED).send();
  }
}
