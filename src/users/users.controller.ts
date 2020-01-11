import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {


    @Get()
    getUsers() {
      return 'working get user';
    }
    
}


