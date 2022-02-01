module.exports = {
  displayName: 'shared-front-back-chat-dtos',
  preset: '../../../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    }
  },
  transform: {
    '^.+\\.[tj]sx?$':  'ts-jest' 
  },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/shared/front-back/chat/dtos'
};
