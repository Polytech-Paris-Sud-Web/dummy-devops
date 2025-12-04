import { datasets } from "../data/fixtures.js";

export const getDatasetById = async (req, res) => {
  const { id } = req.params;
  const dataset = datasets.find((ds) => ds.id === id);

  if (!dataset) {
    const error = new Error("Dataset not found");
    error.meta = { statusCode: 404 };
    throw error;
  }

  res.json(dataset);
};
