import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

export default class WhatsApp {
    private readonly client: Client = new Client({});

    public constructor() {
        this.client.on('qr', qr => {
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            console.log('Client is ready!');
        });
    }

    public initialize(): Promise<void> {
        return this.client.initialize();
    }

    public async sendMessageToNumber(number: string, text: string): Promise<boolean> {
        try {
            const numberDetails = await this.client.getNumberId(number);
            if (!numberDetails)
                return false;
            await this.client.sendMessage(numberDetails._serialized, text);
            console.info(`[${number}] ${text}`);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}
