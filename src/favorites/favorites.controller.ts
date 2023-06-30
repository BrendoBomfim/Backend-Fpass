import { Controller, Get, Post, Param, Delete, Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Adiciona um herói nos favoritos' })
  @Post(':id')
  async create(@Param('id') id: number, @Res() res) {
    const favoriteExists = await this.favoritesService.findOne(id);
    if (favoriteExists) {
      return res.status(400).json({ message: 'Este herói já foi adicionado aos favoritos.' });
    }
    
    await this.favoritesService.create(id);
    return res.status(201).json({ message: 'Favorito adicionado com sucesso.' });
  }

  @ApiOperation({ summary: 'Exibe a lista de favoritos' })
  @Get()
  async findAll(@Res() res) {
    const favorites = await this.favoritesService.findAll();
    if (favorites.length === 0) {
      return res.status(404).json({ message: 'Não há favoritos salvos.' });
    }
    
    return res.status(200).json(favorites);
  }

  @ApiOperation({ summary: 'Remove um heroi da lista de favoritos' })
  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res) {
    const response = await this.favoritesService.remove(+id);
    if (response.affected > 0) {
      return res.status(200).json({ message: 'Favorito removido com sucesso.' });
    }
    
    return res.status(404).json({ message: 'Não foi possível localizar o favorito.' });
  }
}
