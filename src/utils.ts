import * as core from '@actions/core';
import * as context from './context';

// 正则校验表达式
const ACCESS_KEY_REG = RegExp(/^[a-zA-Z0-9]{10,30}$/);
const SECRET_KEY_REG = RegExp(/^[a-zA-Z0-9]{30,50}$/);

/**
 * 目前支持region列表
 */
const regionArray: string[] = [
    'cn-north-1',
    'cn-north-2',
    'cn-north-4',
    'cn-east-2',
    'cn-east-3',
    'cn-south-1',
    'cn-south-2',
    'cn-southwest-2'
];

/**
 * 检查每个inputs 属性value是否合法
 * @param inputs
 * @returns
 */
export function checkInputs(inputs: context.Inputs): boolean {
    if (!checkAkSk(inputs.accessKey, inputs.secretKey)) {
        core.info('ak or sk is not correct.');
        return false;
    }
    if (!checkRegion(inputs.region)) {
        core.info('region is not supported.');
        return false;
    }

    return true;
}

/**
 * 检查aksk是否合法
 * @param inputs
 * @returns
 */
export function checkAkSk(accessKey: string, secretKey: string): boolean {
    return ACCESS_KEY_REG.test(accessKey) && SECRET_KEY_REG.test(secretKey);
}

/**
 * 检查region格式是否合法
 * @returns
 */
export function checkRegion(region: string): boolean {
    return regionArray.includes(region);
}
