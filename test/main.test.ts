import * as main from '../src/main';

import * as utils from '../src/utils';
import * as context from '../src/context';
import * as swr from '../src/swr';
import * as docker from '../src/dockerConfig';

jest.mock('../src/context');
jest.mock('../src/swr');
jest.mock('../src/dockerConfig');

test('mock checkInputs return true', async () => {
  jest.spyOn(utils, 'checkInputs').mockReturnValue(true);
  await main.run();

  expect(context.getInputs).toHaveBeenCalled();
  expect(context.getInputs).toHaveBeenCalledTimes(1);

  expect(utils.checkInputs).toHaveBeenCalled();
  expect(utils.checkInputs).toHaveBeenCalledTimes(1);

  expect(swr.createSecret).toHaveBeenCalled();
  expect(swr.createSecret).toHaveBeenCalledTimes(1);

  expect(docker.setDockerEnv).toHaveBeenCalled();
  expect(docker.setDockerEnv).toHaveBeenCalledTimes(1);


});

test('mock checkInputs return false', async () => {
  jest.spyOn(utils, 'checkInputs').mockReturnValue(false);
  await main.run();

  expect(context.getInputs).toHaveBeenCalled();
  expect(context.getInputs).toHaveBeenCalledTimes(1);

  expect(utils.checkInputs).toHaveBeenCalled();
  expect(utils.checkInputs).toHaveBeenCalledTimes(1);

  expect(swr.createSecret).not.toHaveBeenCalled();

  expect(docker.setDockerEnv).not.toHaveBeenCalled();

});
