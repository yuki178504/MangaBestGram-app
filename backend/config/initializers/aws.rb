# AWSの環境変数の設定
Aws.config.update({
  region: 'ap-northeast-1',
  credentials: Aws::Credentials.new(ENV['AWS_ACCCES_KEY'], ENV['AWS_ACCCES_SECRET_KEY']),
})

Signer = Aws::S3::Presigner.new
