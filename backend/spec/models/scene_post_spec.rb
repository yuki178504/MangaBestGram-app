# encoding: utf-8
require 'rails_helper'

RSpec.describe ScenePost, type: :model do
  describe "シーン新規作成" do
    context "異常系" do
      it "サブタイトルがなければ登録できない" do
        scene_post = ScenePost.new(sub_title: "")
        scene_post.valid?
        expect(scene_post.errors[:sub_title]).to include("can't be blank")
      end

      it "シーンのタイトルがなければ登録できない" do
        scene_post = ScenePost.new(scene_title: "")
        scene_post.valid?
        expect(scene_post.errors[:scene_title]).to include("can't be blank")
      end
    end
  end
end
