# encoding: utf-8
FactoryBot.define do
  factory :user do
    sub {"Auth0のトークン"}
    name {"ゲスト"}
    introduction {"自己紹介"}
    url {"example.com"}
  end
end
