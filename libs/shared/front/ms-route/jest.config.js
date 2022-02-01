module.exports = {
  name: 'ms-route',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ms-route',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
