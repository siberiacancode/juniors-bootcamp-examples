import { eslint } from '@siberiacancode/eslint';

export default eslint(
  { typescript: true, vue: true },
  {
    name: 'cars-leasing/rewrites',
    rules: {
      'e18e/ban-dependencies': 'off'
    }
  }
);
