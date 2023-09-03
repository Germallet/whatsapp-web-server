import express from 'express';
import WhatsAppController from '../controller/WhatsAppController.js';

export default class Server {
    private readonly app = express();

    public constructor() {
        this.app.use(express.json());
        this.app.post('/send', WhatsAppController.sendMessage);
    }

    public async listen(port: number): Promise<void> {
        return new Promise<void>(resolve => {
            this.app.listen(port, () => {
                console.info(`Server is running at http://localhost:${port}`);
                resolve();
            });
        });
    }
}
