import client from '../config/elasticsearch.js';
import { datasets } from '../data/fixtures.js';

const INDEX_NAME = 'datasets';

async function initElasticsearch() {
    try {
        console.log('Starting Elasticsearch initialization...');

        // Check if index exists
        const indexExists = await client.indices.exists({ index: INDEX_NAME });

        if (indexExists) {
            console.log(`Index "${INDEX_NAME}" already exists. Deleting...`);
            await client.indices.delete({ index: INDEX_NAME });
            console.log(`Index "${INDEX_NAME}" deleted.`);
        }

        // Create index with mapping
        console.log(`Creating index "${INDEX_NAME}"...`);
        await client.indices.create({
            index: INDEX_NAME,
            body: {
                mappings: {
                    properties: {
                        title: { type: 'text' },
                        label: { type: 'text' },
                        description: { type: 'text' },
                        labels: { type: 'keyword' },
                        data: { type: 'float' },
                        borderColor: { type: 'keyword' },
                        backgroundColor: { type: 'keyword' },
                        metadata: {
                            properties: {
                                category: { type: 'keyword' },
                                year: { type: 'integer' },
                                period: { type: 'keyword' },
                                unit: { type: 'keyword' }
                            }
                        }
                    }
                }
            }
        });
        console.log(`Index "${INDEX_NAME}" created successfully.`);

        // Index fixture data
        console.log('Loading fixture data...');
        for (const dataset of datasets) {
            await client.index({
                index: INDEX_NAME,
                id: dataset.id,
                body: dataset,
                refresh: true
            });
            console.log(`Indexed dataset with ID: ${dataset.id} - ${dataset.title}`);
        }

        console.log('\nInitialization complete!');
        console.log(`Total datasets indexed: ${datasets.length}`);

        // Verify data
        const count = await client.count({ index: INDEX_NAME });
        console.log(`Documents in index: ${count.count}`);

    } catch (error) {
        console.error('Error during initialization:', error);
        process.exit(1);
    } finally {
        // Close the client
        await client.close();
    }
}

// Run initialization
initElasticsearch();