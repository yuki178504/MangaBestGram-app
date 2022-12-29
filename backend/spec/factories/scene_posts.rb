# encoding: utf-8
FactoryBot.define do
  factory :scene_post do
    association :comic
    association :user
    scene_title {"シーンタイトル"}
    sub_title {"サブタイトル"}
  end
end
