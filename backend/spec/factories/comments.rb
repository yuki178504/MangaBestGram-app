# encoding: utf-8
FactoryBot.define do
  factory :comment do
    user_id {1}
    scene_post_id {1}
    body {"コメントしました"}
  end
end
