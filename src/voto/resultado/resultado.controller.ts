import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { VotoService } from '../voto.service';
import { Response } from 'express';
import { PautasService } from 'src/pautas/pautas.service';
import { ErrorResponse } from 'src/common/error.resource';

@Controller('pautas/:id/resultados')
export class ResultadoController {
  constructor(
    private readonly votoService: VotoService,
    private readonly pautasService: PautasService,
  ) {}

  @Get()
  async obterResultado(@Param('id') idPauta: string, @Res() res: Response) {
    const pauta = await this.pautasService.findById(idPauta);

    if (!pauta) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(new ErrorResponse('Pauta não encontrada'));
    }

    const result = await this.votoService.obterResultado(pauta);

    if (result.isError()) {
      result.error.name;
      return res
        .status(result.error.status)
        .send(new ErrorResponse(result.error.message));
    }

    return res.status(HttpStatus.OK).send(result.value);
  }
}
