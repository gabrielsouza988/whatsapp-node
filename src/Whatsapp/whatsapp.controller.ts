import { Controller, Get } from '@nestjs/common';
import { WhatsappProvider } from './whatsapp.provider';
import { Client } from 'whatsapp-web.js';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappProvider: WhatsappProvider) { }

  @Get('messages')
  async getMessages(): Promise<any> {
    const client: Client = this.whatsappProvider.getClient();
    return 'teste';
    const chats = await client.getChats();
    console.log(chats);
  }
}
