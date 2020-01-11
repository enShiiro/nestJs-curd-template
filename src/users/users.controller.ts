import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {


    @Get()
    getAllProducts() {
      return 'working get user';
    }
    
}


