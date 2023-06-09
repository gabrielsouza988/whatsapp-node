import { Injectable } from '@nestjs/common';
import { Client, RemoteAuth } from 'whatsapp-web.js';
import * as fs from 'fs';
import * as qrcode from 'qrcode-terminal';
import { MongoStore } from 'wwebjs-mongo';
import mongoose from 'mongoose';

@Injectable()
export class WhatsappProvider {
  private client: Client;

  constructor() {
    this.createClient();
  }

  private createClient(): void {
    mongoose.connect('mongodb://localhost:27017/whatsapp').then(() => {
      const store = new MongoStore({ mongoose: mongoose });
      this.client = new Client({
        authStrategy: new RemoteAuth({
          store: store,
          backupSyncIntervalMs: 300000
        })
      });


      // this.client = new Client({
      //   authStrategy: new LocalAuth()
      // });
      this.client.on('qr', (qr) => {
        // Generate and scan this code with your phone
        qrcode.generate(qr, { small: true });
        console.log('QR RECEIVED', qr);
      });
      this.client.on('ready', () => {
        console.log('Client is ready!');
      });

      this.client.on('message', msg => {
        console.log(msg.body);

        if (msg.body == 'hello') {
          msg.reply('pong');
        }
      });

      this.client.initialize();
    });
  }

  // private createClient(): void {
  //   const sessionData = this.getSessionData();
  //   if (sessionData) {
  //     this.client = new Client({
  //       session: sessionData,
  //     });
  //   } else {
  //     this.client = new Client({});
  //     this.client.on('qr', (qr) => {
  //       qrcode.generate(qr, { small: true });
  //     });
  //     this.client.on('authenticated', (session) => {
  //       console.log('Session created');
  //       this.saveSessionData(session);
  //     });
  //   }

  //   this.client.on('ready', () => {
  //     console.log('Client is ready!');
  //   });
  //   this.client.initialize();
  // }

  private getSessionData(): any {
    const sessionFile = './session.json';
    if (fs.existsSync(sessionFile)) {
      const data = fs.readFileSync(sessionFile, 'utf-8');
      return JSON.parse(data);
    }
    return null;
  }

  private saveSessionData(sessionData: any): void {
    fs.writeFileSync('./session.json', JSON.stringify(sessionData));
  }

  public getClient(): Client {
    return this.client;
  }

}
