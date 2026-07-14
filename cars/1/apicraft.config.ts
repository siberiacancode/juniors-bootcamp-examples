import { apicraft } from '@siberiacancode/apicraft';

export default apicraft([
  {
    // https://juniorsbootcamp.ru/api/rest/cars
    input: './generated/spec.json',
    output: './generated/api',
    baseUrl: '/api',
    instance: { name: 'axios', runtimeInstancePath: './src/utils/api/instance' },
    nameBy: 'path',
    groupBy: 'paths'
  }
]);
