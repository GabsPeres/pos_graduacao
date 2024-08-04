import { Client } from 'pg';

export interface DbConnection {
    query(sql: string, params: any[]): Promise<any[]>;
}

export class PgConnection implements DbConnection {
    private client: Client;

    public constructor(url: string) {
        this.client = new Client(url);
    }

    public async query(sql: string, params?: any[]): Promise<any[]> {
        await this.client.connect();
        const result = await this.client.query(sql, params);
        await this.client.end();
        return result.rows;
    }
}
