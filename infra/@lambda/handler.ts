import { CloudFrontRequestEvent, Callback } from 'aws-lambda';
export const handler = (event: CloudFrontRequestEvent, _: unknown, callback: Callback) => {
  const request = event.Records[0].cf.request;
  const { uri } = request;

  /** root/サブディレクトリで指定がなければindex.htmlを見る */
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    // subFolderは作らないのでパスに拡張子をつける
    request.uri += '.html';
  }

  callback(null, request);
  return;
};
