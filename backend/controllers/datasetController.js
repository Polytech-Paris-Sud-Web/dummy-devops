import client from '../config/elasticsearch.js';

const INDEX_NAME = 'datasets';

export const getDatasetById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await client.get({
            index: INDEX_NAME,
            id: id
        });

        if (!result.found) {
            return res.status(404).json({ error: 'Dataset not found' });
        }

        res.json(result._source);
    } catch (error) {
        console.error('Error fetching dataset:', error);

        if (error.meta?.statusCode === 404) {
            return res.status(404).json({ error: 'Dataset not found' });
        }

        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};