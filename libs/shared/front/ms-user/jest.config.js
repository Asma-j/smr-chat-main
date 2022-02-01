module.exports = {
  name: 'ms-user',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ms-user',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
