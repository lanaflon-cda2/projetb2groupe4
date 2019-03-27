import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { AgenceModule } from './agence/agence.module';
import { ImageModule } from './image/image.module';
import { AdresseModule } from './adresse/adresse.module';
import { BienModule } from './bien/bien.module';
import { VilleModule } from './ville/ville.module';
import { UtilisateurController } from './utilisateur/utilisateur.controller';
import { DependanceController } from './dependance/dependance.controller';
import { ImageController } from './image/image.controller';
import { MdpController } from './mdp/mdp.controller';
import { DepartementModule } from './departement/departement.module';
import { MdpModule } from './mdp/mdp.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AdresseModule,
    AgenceModule,
    BienModule,
    ImageModule,
    UtilisateurModule,
    VilleModule,
    DepartementModule,
    MdpModule,
  ],
  controllers: [
    AppController,
    UtilisateurController,
    DependanceController,
    ImageController,
    MdpController,
  ],
  providers: [AppService],
})
export class AppModule {}
