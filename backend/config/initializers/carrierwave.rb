# require 'carrierwave/storage/abstract'
# require 'carrierwave/storage/file'
# require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  config.asset_host = "http://localhost:3000"
  config.storage = :file
  config.cache_storage = :file
end

CarrierWave.configure do |config|
    config.storage :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory  = ENV['BUCKET']
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY'],
      aws_secret_access_key: ENV['AWS_ACCCES_SECRET_KEY'],
      region: 'ap-northeast-1',
      path_style: true
    }
end 
