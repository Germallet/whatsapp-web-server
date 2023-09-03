import WhatsApp from '../services/WhatsApp.js';
import Server from './Server.js';

export default abstract class App {
    public static readonly whatsAppService = new WhatsApp();

    public static async start(port: number): Promise<void> {
        await App.whatsAppService.initialize();
        await new Server().listen(port);
    }
}
