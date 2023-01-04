# encoding: utf-8
FactoryBot.define do
  factory :scene_post do
    association :comic
    association :user
    scene_title {"シーンタイトル"}
    sub_title {"サブタイトル"}
    scene_date {"2022-12-30"}
    scene_content {"シーンの内容"}
    scene_number {1}
  end
end
