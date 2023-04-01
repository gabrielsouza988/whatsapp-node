import { Module } from '@nestjs/common';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappProvider } from './whatsapp.provider';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/whatsapp')],
  providers: [WhatsappProvider],
  controllers: [WhatsappController],
})
export class WhatsappModule { }
