# encoding: utf-8
FactoryBot.define do
  factory :favorite do
    association :scene_post
    association :user
  end
end
