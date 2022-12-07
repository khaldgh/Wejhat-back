import { ConfigModule } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { async } from "rxjs";


export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigModule],
    useFactory: async(): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'Password',
            database: 'new_schema',
            entities: ['**/*.entity.ts'],
            migrations: ['migrations/*.js'],
            synchronize: false,
            logging: true
        }
    }
}