import { EnvType, load } from 'ts-dotenv';

export const schema = {
    API_KEYS: String
};

export const env: EnvType<typeof schema> = load(schema);
