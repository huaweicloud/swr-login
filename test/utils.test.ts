import * as utils from '../src/utils';

describe('test whether the aksk parameter is valid', () => {
    const testCase = [
      {
        accessKey: '1234567890',
        secretKey: '123456789012345678901234567890',
        result: true
      },
      {accessKey: '', secretKey: '', result: false},
      {accessKey: '', secretKey: '123456789012345678901234567890', result: false},
      {accessKey: '1234567890', secretKey: '', result: false},
      {
        accessKey: '12345',
        secretKey: '123456789012345678901234567890',
        result: false
      },
      {accessKey: '1234567890', secretKey: '1234567890', result: false},
      {
        accessKey: '1234567890123456789012345678901',
        secretKey: '123456789012345678901234567890123456789012345678901',
        result: false
      },
      {
        accessKey: '1234567890123456789012345678901',
        secretKey: '123456789012345678901234567890',
        result: false
      },
      {
        accessKey: '1234567890',
        secretKey: '123456789012345678901234567890123456789012345678901',
        result: false
      },
      {
        accessKey: '1234%^890',
        secretKey: '1234567890123456#$12345678901234567890',
        result: false
      }
    ];
    testCase.forEach(item => {
      const {accessKey, secretKey, result} = item;
      test(`AK,SK输入为(${accessKey})and(${secretKey})，返回值为${result}`, () => {
        expect(utils.checkAkSk(accessKey, secretKey)).toBe(result);
      });
    });
  });

  describe('test whether the region parameter is valid', () => {
    const testCase = [
      {region: 'cn-north-4', result: true},
      {region: 'cnnorth1', result: false},
      {region: 'ap-southeastst', result: false},
      {region: 'cnnorth-north-4', result: false},
      {region: 'cn-north-4f', result: false},
      {region: 'dsdasa', result: false}
    ];
    testCase.forEach(item => {
      const {region, result} = item;
      test(`region输入为(${region})，返回值为${result}`, () => {
        expect(utils.checkRegion(region)).toBe(result);
      });
    });
  });

  describe('test whether check Inputs is valid', () => {
    const testCase = [
      {
        description: 'aksk和region同时合法',
        input: {
          accessKey: '1234567890',
          secretKey: '123456789012345678901234567890',
          region: 'cn-north-4'
        },
        result: true
      },
      {
        description: 'aksk不合法和region合法',
        input: {
          accessKey: '1234567890&*',
          secretKey: '123456789012345678901234567890',
          region: 'cn-north-4'
        },
        result: false
      },
      {
        description: 'aksk合法和region不合法',
        input: {
          accessKey: '1234567890&*',
          secretKey: '123456789012345678901234567890',
          region: 'cndddd'
        },
        result: false
      },
      {
        description: 'aksk不合法和region不合法',
        input: {
          accessKey: '1234567890&*',
          secretKey: '123456789012345678901234567890',
          region: 'cn-north4'
        },
        result: false
      }
    ];
    testCase.forEach(item => {
      const {description, input, result} = item;
      test(`${description}，返回值为${result}`, () => {
        expect(utils.checkInputs(input)).toBe(result);
      });
    });
  });