import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const removalPolicy = cdk.RemovalPolicy.DESTROY;

    const bucket = new s3.Bucket(this, 'Bucket', {
      bucketName: 'sandbox-next-ssg-hirosh',
      autoDeleteObjects: true,
      removalPolicy,
    });

    // Create OriginAccessIdentity
    const oai = new cloudfront.OriginAccessIdentity(this, 'Origin Access Identity', { comment: 'todays wallpaper' });
    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [bucket.arnForObjects('*')],
        principals: [new iam.CanonicalUserPrincipal(oai.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
      })
    );

    const edgeFunction = new NodejsFunction(this, 'EdgeFunction', {
      entry: '@lambda/handler.ts',
      memorySize: 2024,
    });

    const edgeFunctionVersion = new lambda.Version(this, 'EdgeFunctionVersion', {
      lambda: edgeFunction,
    });

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
        compress: false,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        edgeLambdas: [
          {
            eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
            functionVersion: edgeFunctionVersion,
          },
        ],
      },
      errorResponses: [
        {
          httpStatus: 403,
          ttl: cdk.Duration.seconds(300),
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
      defaultRootObject: 'index.html',
      comment: 'SandboxNuxtSSGHirosh',
      httpVersion: cloudfront.HttpVersion.HTTP2,
    });

    new cdk.CfnOutput(this, 'domain', {
      value: distribution.domainName,
    });
  }
}
