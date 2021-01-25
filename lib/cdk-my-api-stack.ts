import * as apigv2 from '@aws-cdk/aws-apigatewayv2';
import * as apigv2int from '@aws-cdk/aws-apigatewayv2-integrations';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

import * as path from 'path';

export class CdkMyApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myApiFunction = new lambda.DockerImageFunction(this, 'MyApiFunction', {
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../src')),
    });

    const defaultIntegration = new apigv2int.LambdaProxyIntegration({
      handler: myApiFunction,
    });

    const httpApi = new apigv2.HttpApi(this, 'MyApi', {
      defaultIntegration: defaultIntegration
    });

    new cdk.CfnOutput(this, 'MyApiUrl', {
      value: httpApi.apiEndpoint
    });
    
    new cdk.CfnOutput(this, 'MyApiFnLogGroup', {
      value: myApiFunction.logGroup.logGroupName
    });

  }
}
