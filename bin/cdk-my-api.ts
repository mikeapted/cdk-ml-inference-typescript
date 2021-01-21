#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkMyApiStack } from '../lib/cdk-my-api-stack';

const app = new cdk.App();
new CdkMyApiStack(app, 'CdkMyApiStack');
