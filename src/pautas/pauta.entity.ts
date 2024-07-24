import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pauta {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  descricao: string;

  @CreateDateColumn({ name: 'data_cadastro' })
  dataCadastro?: Date;

  @Column({ type: 'timestamp', nullable: true })
  abertura?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechamento?: Date;

  obterStatus(): string {
    if (this.fechamento && this.fechamento < new Date())
      return StatusPauta.ENCERRADA;

    if (this.abertura) return StatusPauta.INICIADA;

    return StatusPauta.NAO_INCIADA;
  }

  public isInStatus(statusVerify: StatusPauta): boolean {
    const status = this.obterStatus();
    return status == statusVerify;
  }

  public isFoiIniciada(): boolean {
    return this.isInStatus(StatusPauta.NAO_INCIADA);
  }

  public isFoiEncerrada(): boolean {
    return this.isInStatus(StatusPauta.NAO_INCIADA);
  }

  public isPossivelIniciarSessao(): boolean {
    return this.isInStatus(StatusPauta.NAO_INCIADA);
  }
}

enum StatusPauta {
  NAO_INCIADA = 'Sessão não iniciada',
  INICIADA = 'Sessão iniciada',
  ENCERRADA = 'Pauta Encerrada',
}
