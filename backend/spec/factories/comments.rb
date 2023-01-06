# encoding: utf-8
FactoryBot.define do
  factory :comment do
    association :user
    association :scene_post
    body {"コメントしました"}
  end
end
