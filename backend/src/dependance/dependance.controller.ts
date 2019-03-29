import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { DependanceService } from './dependance.service';
import { DependancePostInDto } from './dependance.dto';
import { Dependance } from './dependance.entity';

@Controller('dependance')
export class DependanceController {
  constructor(private readonly dependanceService: DependanceService) {}

  @Get()
  findAll() {
    return this.dependanceService.findAll();
  }

  @Get(':dependanceId')
  findOneById(@Param('dependanceId') dependanceId: string) {
    return this.dependanceService.findById(dependanceId);
  }

  @Post()
  create(@Body() dto: DependancePostInDto) {
    return this.dependanceService.create(dto);
  }

  @Put(':dependanceId/update')
  async update(
    @Param('dependanceId') dependanceId,
    @Body() dto: Dependance,
  ): Promise<any> {
    dto.dependanceId = String(dependanceId);
    // console.log('Update #' + dto.dependanceId);
    return this.dependanceService.update(dto);
  }

  @Delete(':dependanceId/delete')
  async delete(@Param('dependanceId') dependanceId): Promise<any> {
    return this.dependanceService.delete(dependanceId);
  }
}
