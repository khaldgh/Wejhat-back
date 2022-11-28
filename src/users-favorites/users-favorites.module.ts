import { Module } from '@nestjs/common';
import { UsersFavoritesController } from './users-favorites.controller';
import { UsersFavoritesService } from './users-favorites.service';

@Module({
  controllers: [UsersFavoritesController],
  providers: [UsersFavoritesService],
  exports: [UsersFavoritesService]
})
export class UsersFavoritesModule {}
