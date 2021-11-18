/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { alpha3, hasWrongDimensionName } from '../alpha3';

describe('alpha3 - ', () => {
  test('should not match has wrong dimension name when config datas is empty', () => {
    const config = {
      datas: [],
    };
    expect(hasWrongDimensionName(config as any)).toBe(false);
  });

  test('should not match has wrong dimension name when config datas not contains deminsion key', () => {
    const config = {
      datas: [{ key: 'dimension' }, { key: 'metrics' }],
    };
    expect(hasWrongDimensionName(config as any)).toBe(false);
  });

  test('should match has wrong dimension name when config datas contains deminsion key', () => {
    const config = {
      datas: [{ key: 'deminsion' }, { key: 'metrics' }],
    };
    expect(hasWrongDimensionName(config as any)).toBe(true);
  });

  test('should not change anything when datas is emtpy', () => {
    const config = {
      datas: [],
    };
    expect(alpha3(config as any)).toBe(config);
  });

  test('should change key when key name is matched', () => {
    const config = {
      datas: [{ key: 'deminsion' }],
    };
    expect(alpha3(config as any)).toMatchObject({
      datas: [{ key: 'metrics' }],
    });
  });

  test('should change key when key name is matched', () => {
    const config = {
      datas: [
        { key: 'deminsion', value: 1 },
        { key: 'metrics', value: 2 },
      ],
    };
    expect(alpha3(config as any)).toMatchObject({
      datas: [
        { key: 'metrics', value: 1 },
        { key: 'dimension', value: 2 },
      ],
    });
  });
});
