import { db } from "../db/mysql";

interface DbConfig {
    key: string;
    value: string;
}

export const config = {};
export function loadConfig() {
    return db.query<DbConfig[]>('SELECT * FROM config')
        .then( cfgs => {
            cfgs.forEach(({key, value}) => {
                config[key] = key.charAt(key.length - 1) === 's' ? value.split('\n').map(s => s.trim()) : value;
            });
            return config;
        })
        .catch( err => console.error(err));
}
