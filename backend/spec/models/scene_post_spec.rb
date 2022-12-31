# encoding: utf-8
require 'rails_helper'

RSpec.describe ScenePost, type: :model do
  describe "シーン新規作成" do
    let(:scene_post) { ScenePost.new(sub_title: "", scene_title: "") }
    let(:scene_posts) { create(:scene_post) }

    context "正常系" do
      it "サブタイトルとシーンのタイトルがあれば登録できる" do
        expect(scene_posts).to be_valid
      end
    end
    context "異常系" do
      it "サブタイトルがなければ登録できない" do
        scene_post.valid?
        expect(scene_post.errors[:sub_title]).to include("can't be blank")
      end

      it "シーンのタイトルがなければ登録できない" do
        scene_post.valid?
        expect(scene_post.errors[:scene_title]).to include("can't be blank")
      end
    end
  end
  describe "アソシエーションテスト" do
    context "comicモデルとの関係" do
      it "N:1となっている" do
        expect(ScenePost.reflect_on_association(:comic).macro).to eq :belongs_to
      end
    end
    context "userモデルとの関係" do
      it "1:Nとなっている" do
        expect(ScenePost.reflect_on_association(:user).macro).to eq :belongs_to
      end
    end
    context "userモデルとの関係" do
      it "N:Nとなっている" do
        expect(ScenePost.reflect_on_association(:favorite_users).macro).to eq :has_many
      end
    end
    context "favoriteモデルとの関係" do
      it "1:Nとなっている" do
        expect(ScenePost.reflect_on_association(:favorites).macro).to eq :has_many
      end
    end
    context "commentモデルとの関係" do
      it "1:Nとなっている" do
        expect(ScenePost.reflect_on_association(:comments).macro).to eq :has_many
      end
    end
  end
end
