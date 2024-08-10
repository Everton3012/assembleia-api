import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { PautasService } from 'src/pautas/pautas.service';
import { VotoService } from './voto.service';
import { RegistroVotoResource } from './voto.resource';
import { Response } from 'express';
import { ErrorResponse } from 'src/common/error.resource';

@Controller('pautas/:id/voto')
export class VotoController {
  constructor(
    private readonly pautaService: PautasService,
    private readonly votoService: VotoService,
  ) {}

  @Post()
  async registrarVoto(
    @Param('id') idPauta: string,
    @Body() resouce: RegistroVotoResource,
    @Res() res: Response,
  ) {
    const pauta = await this.pautaService.findById(idPauta);

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

    if (result) return res.status(HttpStatus.ACCEPTED).send();
  }
}
