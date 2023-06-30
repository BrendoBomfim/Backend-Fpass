import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { MarvelApiService } from './../marvel-api/marvel-api.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    private readonly marvelService: MarvelApiService
  ) {}

  async create(id: number) {
    const hero = await this.marvelService.getHeroById(id);
    const { id: marvelId, name, description } = hero;

    const createFavoriteDto: CreateFavoriteDto = {
      marvelId,
      name,
      description,
    };

    return this.favoriteRepository.save(createFavoriteDto);
  }

  async findOne(id: number): Promise<Favorite | null> {
    return this.favoriteRepository.findOneBy({ marvelId: id });
  }

  async findAll() {
    return this.favoriteRepository.find();
  }

  remove(id: number) {
    return this.favoriteRepository.delete(id);
  }
}
