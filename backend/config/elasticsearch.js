import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
    auth: {
        username: process.env.ELASTICSEARCH_USERNAME || 'elastic',
        password: process.env.ELASTICSEARCH_PASSWORD || 'changeme'
    }
});

// Test connection
export const testConnection = async () => {
    try {
        const health = await client.cluster.health();
        console.log('Elasticsearch connection successful:', health.status);
        return true;
    } catch (error) {
        console.error('Elasticsearch connection failed:', error.message);
        return false;
    }
};

export default client;