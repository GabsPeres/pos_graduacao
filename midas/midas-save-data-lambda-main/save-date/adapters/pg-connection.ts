import { Client } from 'pg';

export interface DbConnection {
    query(instruction: string, params?: any[]): Promise<any[]>;
}

export class PgConnection implements DbConnection {
    public constructor(readonly connectionUrl: string) {}

    public async query(instruction: string, params?: any[]): Promise<any[]> {
        const client = new Client(this.connectionUrl);
        await client.connect();
        const response = await client.query(instruction, params ?? []);
        await client.end();
        return response.rows;
    }
}
