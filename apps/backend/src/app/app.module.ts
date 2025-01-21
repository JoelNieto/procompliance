import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import { CountryEntity } from './entities/country.entity';
import { ParticipantModule } from './participants/participant.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.test.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        database: config.get('DB_NAME'),
        password: config.get('DB_PASSWORD'),
        synchronize: true,
        logging: config.get('DB_LOGGING'),
        entities: [CountryEntity],
        ssl: true,
      }),
      inject: [ConfigService],
    }),
    CountriesModule,
    ParticipantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
