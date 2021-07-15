module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/index.ts',
      '!<rootDir>/src/main/**',
      '!<rootDir>/src/infra/dynamodb/**',
      '!<rootDir>/src/infra/mongodb/models/**'
    ],
  };