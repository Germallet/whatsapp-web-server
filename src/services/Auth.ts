import { env } from '../main/Env.js';

export default abstract class Auth {
    public static authenticate(apiKey: string): boolean {
        return env.API_KEYS.split(';').includes(apiKey);
    }
}
