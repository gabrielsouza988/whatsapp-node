import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappModule } from './Whatsapp/whatsapp.module';

@Module({
  imports: [WhatsappModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
