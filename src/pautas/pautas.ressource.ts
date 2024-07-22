import { Pauta } from './pauta.entity';

export class CriarPautaResource {
  descricao: string;
}

export class PautaResorce {
  id: string;
  descricao: string;
  status: string;
}

export function toRepresentation(entity: Pauta): PautaResorce {
  const resource = new PautaResorce();
  resource.id = entity.id;
  resource.descricao = entity.descricao;
  resource.status = entity.obterStatus();

  return resource;
}

export function toDomain(resource: CriarPautaResource): Pauta {
  const pauta = new Pauta();
  pauta.descricao = resource.descricao;
  return pauta;
}
