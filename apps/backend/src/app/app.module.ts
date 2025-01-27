import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import { CountryEntity } from './countries/entities/country.entity';
import { ParamItemEntity } from './param-items/entities/param-item.entity';
import { ParamItemsModule } from './param-items/param-items.module';
import { ParamTableEntity } from './param-tables/entities/param-table.entity';
import { ParamTablesModule } from './param-tables/param-tables.module';
import { ParticipantEntity } from './participants/entities/participant.entity';
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
        entities: [
          CountryEntity,
          ParticipantEntity,
          ParamTableEntity,
          ParamItemEntity,
        ],
        ssl: config.get('DB_SSL') === 'true',
      }),
      inject: [ConfigService],
    }),
    CountriesModule,
    ParticipantModule,
    ParamTablesModule,
    ParamItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
