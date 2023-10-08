import { Request, Response } from 'express';
import { z } from 'zod';
import App from '../main/App.js';
import Auth from '../services/Auth.js';

export default class WhatsAppController {
    public static async sendMessage(request: Request, response: Response): Promise<void> {
        let requestData: { number: string, apiKey: string, text: string };
        try {
            requestData = z.object({
                apiKey: z.string(),
                number: z.string(),
                text: z.string()
            }).strict().parse(request.body);
        } catch (e) {
            response.status(400).send('Fail');
            return;
        }

        if (!Auth.authenticate(requestData.apiKey)) {
            response.status(401).send('Unauthorized');
            return;
        }

        const result = await App.whatsAppService.sendMessageToNumber(requestData.number, requestData.text);
        if (result)
            response.status(200).send('Ok');
        else
            response.status(400).send('Fail');
    }
}
