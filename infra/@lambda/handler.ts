import { CloudFrontRequestEvent, Callback } from 'aws-lambda';
export const handler = (event: CloudFrontRequestEvent, _: unknown, callback: Callback) => {
  console.log('start');
  const request = event.Records[0].cf.request;
  console.log('event', event.Records[0].cf.request);
  const { uri } = request;

  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '.html';
  }
  console.log('request', request);
  callback(null, request);
  return;
};
