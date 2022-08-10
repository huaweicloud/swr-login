import * as swr from '../src/swr';
import * as core from '@actions/core';

const mockWithSk = jest.fn();
const mockCreateSecret = jest.fn();

jest.mock('@actions/core');
jest.mock('@huaweicloud/huaweicloud-sdk-core', () => {
    return {
        BasicCredentials: jest.fn(() => ({
            withAk: jest.fn(() => ({
                withSk: mockWithSk
            }))
        }))
    };
});

jest.mock('@huaweicloud/huaweicloud-sdk-swr', () => {
    return {
        SwrClient: {
            newBuilder: jest.fn(() => ({
                withCredential: jest.fn(() => ({
                    withEndpoint: jest.fn(() => ({
                        withOptions: jest.fn(() => ({
                            build: jest.fn(() => ({
                                createSecret: mockCreateSecret
                            }))
                        }))
                    }))
                }))
            }))
        },
        CreateSecretRequest: jest.fn()
    };
});

describe('test swr create secret', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('test create secret when httpStatusCode is 200', async () => {
        mockCreateSecret.mockImplementation(() => {
            return {
                auths: {
                    'swr.cn-north-4.myhuaweicloud.com': {
                        auth: 'auth'
                    }
                },
                httpStatusCode: 200
            };
        });
        const input = {
            accessKey: '1234567890&*',
            secretKey: '123456789012345678901234567890',
            region: 'cn-north-4'
        };
        expect(await swr.createSecret(input)).toBe(
            '{"auths":{"swr.cn-north-4.myhuaweicloud.com":{"auth":"auth"}}}'
        );
        expect(mockWithSk).toHaveBeenCalled();
    });

    test('test create secret when httpStatusCode is not 200', async () => {
        mockCreateSecret.mockImplementation(() => {
            return {
                auths: {
                    'swr.cn-north-4.myhuaweicloud.com': {
                        auth: 'auth'
                    }
                },
                httpStatusCode: 404
            };
        });
        const input = {
            accessKey: '1234567890&*',
            secretKey: '123456789012345678901234567890',
            region: 'cn-north-4'
        };
        await swr.createSecret(input);
        expect(core.setFailed).toHaveBeenCalledTimes(1);
    });

    test('test create secret project when throw error', async () => {
        mockCreateSecret.mockImplementation(() => {
            throw new Error('Server Error.');
        });
        const input = {
            accessKey: '123456789012',
            secretKey: '123456789012345678901234567890',
            region: 'cn-north-4'
        };
        await expect(swr.createSecret(input)).rejects.toThrow('Get SWR Secret Failed.');
    });
});
