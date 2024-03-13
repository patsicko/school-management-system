import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, ConflictException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {Request,Response} from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ApiBody } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
    ) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {

    const existingUser = await this.userService.findUserByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }
    const user = new User()

    user.firstName=createUserDto.firstName;
    user.lastName=createUserDto.lastName;
    user.email=createUserDto.email

    const saltRounds=10;
    const hashedPassword= await bcrypt.hash(createUserDto.password,saltRounds)
    user.password=hashedPassword;
    return this.userService.create(user)
  }

  @Get("all")
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', description: 'User email' },
        password: { type: 'string', description: 'User password' },
      },
    },
  })
  @Post('login')
  async login(
   @Body('email') email:string,
   @Body('password') password:string,
   @Req() request: Request,
   @Res({passthrough:true}) response:Response
  ){
   const user= await this.userService.findUserByEmail(email);
   console.log("loggin userrrrr",user)

   if(!user){
       throw new BadRequestException('Invalid credentials');
   }

   if(!await bcrypt.compare(password,user.password)){
       throw new BadRequestException('Invalid credentials');  
   }

  //  const payload = { sub: user };
  //  const jwt = await this.jwtService.signAsync(payload);

  // response.cookie('jwt',jwt,{httpOnly:true})

   return {
       user
   }
  }
}
