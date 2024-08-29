/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { AwsSolutionsChecks } from 'cdk-nag';
import {
  LlamaindexCommonDepsLayer,
} from '../../../../src/patterns/gen-ai/aws-llamaindex-common-layer';

describe('LlamaindexCommonDepsLayer construct', () => {

  let app: cdk.App;
  let LlamaindexCommonLayerDepsTestTemplate: Template;
  let LlamaindexCommonLayerDepsTestConstruct: LlamaindexCommonDepsLayer;

  afterAll(() => {
    console.log('Test completed');
    console.log(LlamaindexCommonLayerDepsTestTemplate.toJSON());
  });

  beforeAll(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const LlamaindexCommonLayerDepsTestStack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: 'us-east-1' },
    });

    // Lambda layer
    const lambdaArchitecture = lambda.Architecture.ARM_64;
    const lambdaRuntime = lambda.Runtime.PYTHON_3_10;

    LlamaindexCommonLayerDepsTestConstruct = new LlamaindexCommonDepsLayer(LlamaindexCommonLayerDepsTestStack, 'lambdagenaidepslayer', {
      runtime: lambdaRuntime,
      architecture: lambdaArchitecture,
      autoUpgrade: true,
    });
    LlamaindexCommonLayerDepsTestTemplate = Template.fromStack(LlamaindexCommonLayerDepsTestStack);

  });

  test('LayerVersionDeps count', () => {
    LlamaindexCommonLayerDepsTestTemplate.resourceCountIs('AWS::Lambda::LayerVersion', 1);
    expect(LlamaindexCommonLayerDepsTestConstruct.layer).not.toBeNull;
  });
});

