# encoding: utf-8
require 'rails_helper'

RSpec.describe "Api::V1::ScenePosts", type: :request do
  describe "非ログインユーザーのシーン閲覧機能" do
    let!(:scene_post) { create(:scene_post, comic_id: comic.id) }
    let(:comic) { create(:comic) }

    before do
      get api_v1_comic_scene_posts_path(comic.id)
    end

    context "api_v1_comic_scene_posts_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to have_http_status(200)
      end

      it "bodyにシーンのサブタイトルが含まれていること" do
        expect(response.body).to include scene_post.sub_title
      end

      it "bodyにシーンの内容が含まれていること" do
        expect(response.body).to include scene_post.scene_title
      end

      it "bodyにシーンの日付が含まれていること" do
        expect(response.body).to include scene_post.scene_date.to_s
      end

      it "bodyにシーンの話数が含まれていること" do
        expect(response.body).to include scene_post.scene_number.to_s
      end

      it "bodyにシーンの詳細・感想が含まれていること" do
        expect(response.body).to include scene_post.scene_content
      end
    end
  end

  describe "非ログインユーザーのシーン詳細閲覧機能" do
    let!(:scene_post) { create(:scene_post, comic_id: comic.id) }
    let(:comic) { create(:comic) }

    before do
      get api_v1_scene_post_path(scene_post.id)
    end

    context "api_v1_scene_postにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to have_http_status(200)
      end

      it "bodyにシーンのサブタイトルが含まれていること" do
        expect(response.body).to include scene_post.sub_title
      end

      it "bodyにシーンの内容が含まれていること" do
        expect(response.body).to include scene_post.scene_title
      end

      it "bodyにシーンの日付が含まれていること" do
        expect(response.body).to include scene_post.scene_date.to_s
      end

      it "bodyにシーンの話数が含まれていること" do
        expect(response.body).to include scene_post.scene_number.to_s
      end

      it "bodyにシーンの詳細・感想が含まれていること" do
        expect(response.body).to include scene_post.scene_content
      end
    end
  end
end
