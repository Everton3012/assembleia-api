import { Pauta } from 'src/pautas/pauta.entity';
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Associado } from './associado/associado.entity';

export class Voto {
  @PrimaryGeneratedColumn()
  id?: string;

  @ManyToOne(() => Pauta)
  @JoinColumn({ name: 'id_pauta' })
  pauta: Pauta;

  @ManyToOne(() => Associado)
  @JoinColumn({ name: 'id_associado' })
  associado: Associado;

  @Column({ name: 'voto' })
  opacoVoto: OpcaoVoto;
}

export enum OpcaoVoto {
  SIM = 'SIM',
  NAO = 'NAO',
}
