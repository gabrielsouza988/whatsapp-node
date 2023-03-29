import { Module } from '@nestjs/common';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappProvider } from './whatsapp.provider';

@Module({
  providers: [WhatsappProvider],
  controllers: [WhatsappController],

})
export class WhatsappModule { }
