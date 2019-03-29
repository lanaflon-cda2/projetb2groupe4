import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Proposition } from 'src/proposition/proposition.entity';
import { Bien } from 'src/bien/bien.entity';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';
import { Image } from 'src/image/image.entity';

@Entity({ name: 'client' })
export class Client {
  @PrimaryGeneratedColumn('uuid', { name: 'client_id' })
  clientId: string;

  @Column('uuid', { name: 'client_num_parrainage' })
  clientNumParrainage: string;

  @OneToMany(() => Proposition, proposition => proposition.client)
  propositions: Proposition[];

  @OneToMany(() => Bien, bien => bien.client)
  biens: Bien[];

  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.clients)
  @JoinColumn({ name: 'utilisateur_client' })
  utilisateur: Utilisateur;
  @Column({ name: 'utilisateur_id', type: 'uuid', nullable: false })
  idBien: string;

  @OneToMany(() => Image, image => image.dependance)
  images: Image[];

  @ManyToMany(() => Bien, bien => bien.clients)
  biensFavoris: Bien[];

  constructor(copy: Partial<Client> = {}) {
    this.clientId = copy.clientId || undefined;

    this.clientNumParrainage = copy.clientNumParrainage || null;
    this.propositions = copy.propositions || null;
    this.biens = copy.biens || null;
    this.utilisateur = copy.utilisateur || null;
    this.biensFavoris = copy.biensFavoris || null;
  }
}