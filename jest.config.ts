import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jest-fixed-jsdom',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;
