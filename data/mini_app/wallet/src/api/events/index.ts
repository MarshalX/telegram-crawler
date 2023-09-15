import axios from 'axios';

import { EventsGatewayApi } from './generated';

const axiosInstance = axios.create();

const config = {
  basePath: 'https://events-gateway.ncdev.site',
  isJsonMime: () => false,
};

const API = {
  EventsGateway: new EventsGatewayApi(config, '', axiosInstance),
};

export default API;
