module.exports = {
  name: 'ms-auth',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ms-auth',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
