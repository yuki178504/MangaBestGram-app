# encoding: utf-8
FactoryBot.define do
  factory :comic do
    association :user
    title {"ワンピース"}
    genre {"アドベンチャー"}
  end
end
