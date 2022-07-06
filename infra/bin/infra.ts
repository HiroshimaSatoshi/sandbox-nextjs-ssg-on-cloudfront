#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';

const env: cdk.StackProps = {
  env: {
    region: 'us-east-1',
  },
};

const app = new cdk.App();
new InfraStack(app, 'InfraStack', { ...env, stackName: 'SandboxNextSSG' });
