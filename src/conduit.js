import axios from 'axios';

function printError(error) {
  const { message } = error.toJSON();

  console.log(`Error: ${message}`);
}

class ConduitAPI {
  constructor(host) {
    this.host = host || 'http://localhost:8080';
  }

  async getPipelines() {
    try {
      const pipelines = await axios.get(`${this.host}/v1/pipelines`, {
        headers: {
          accept: 'application/json',
        },
      });
      return pipelines.data;
    } catch (error) {
      printError(error);
      throw Error('Could not get pipelines');
    }
  }

  async createPipeline(name, description) {
    try {
      const pipeline = await axios.post(`${this.host}/v1/pipelines`, { config: { name, description } });
      return pipeline.data;
    } catch (error) {
      printError(error);
      throw Error('Could not create pipeline');
    }
  }

  async startPipeline(pipelineId) {
    try {
      const pipeline = await axios.post(
        `${this.host}/v1/pipelines/${pipelineId}/start`,
        {},
        {
          headers: {
            accept: 'application/json',
          },
        }
      );
      return pipeline.data;
    } catch (error) {
      printError(error);
      throw Error('Could not start pipeline');
    }
  }

  async createConnector(config) {
    try {
      const pipeline = await axios.post(`${this.host}/v1/connectors`, config);
      return pipeline.data;
    } catch (error) {
      printError(error);
      throw Error('Could not create connector');
    }
  }
}

export default ConduitAPI;
