import axios from 'axios';

const CONDUIT_HOST = 'http://localhost:8080';

export async function getPipelines() {
  try {
    const pipelines = await axios.get(`${CONDUIT_HOST}/v1/pipelines`, {
      headers: {
        accept: 'application/json',
      },
    });
    return pipelines.data;
  } catch (error) {
    console.log(error.data.message);
  }
}

export async function createPipeline(name, description) {
  try {
    const pipeline = await axios.post(`${CONDUIT_HOST}/v1/pipelines`, { config: { name, description } });
    return pipeline.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function startPipeline(pipelineId) {
  try {
    const pipeline = await axios.post(
      `${CONDUIT_HOST}/v1/pipelines/${pipelineId}/start`,
      {},
      {
        headers: {
          accept: 'application/json',
        },
      }
    );
    return pipeline.data;
  } catch (error) {
    console.log(error.data);
  }
}

export async function createConnector(config) {
  try {
    const pipeline = await axios.post(`${CONDUIT_HOST}/v1/connectors`, config);
    return pipeline.data;
  } catch (error) {
    console.log(error);
  }
}
