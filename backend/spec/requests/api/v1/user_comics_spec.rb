# encoding: utf-8
require 'rails_helper'

RSpec.describe "Api::V1::ScenePosts", type: :request do
  describe "ユーザーの情報一覧閲覧機能" do
    let!(:comic) { create(:comic, user_id: user.id) }
    let(:user) { create(:user) }

    before do
      get api_v1_user_user_comics_path(user.id)
    end

    context "api_v1_user_user_comics_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to have_http_status(200)
      end

      it "bodyに漫画のタイトルが含まれていること" do
        expect(response.body).to include comic.title
      end

      it "bodyに漫画のジャンルが含まれていること" do
        expect(response.body).to include comic.genre
      end
    end
  end

  describe "ユーザーのシーン数をカウントする機能" do
    let!(:scene_post) { create(:scene_post, user_id: user.id) }
    let(:user) { create(:user) }

    before do
      get scene_post_count_api_v1_user_user_comics_path(user.id)
    end

    context "scene_post_count_api_v1_user_user_comics_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to have_http_status(200)
      end
    end
  end
end
