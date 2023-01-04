# encoding: utf-8
require 'rails_helper'

RSpec.describe "Api::V1::Comments", type: :request do
  describe "非ログインユーザーのコメント閲覧機能" do
    let!(:comment) { create(:comment, scene_post_id: scene_post.id) }
    let(:comic) { create(:comic) }
    let(:scene_post) { create(:scene_post, comic_id: comic.id) }

    before do
      get api_v1_scene_post_comments_path(scene_post.id)
    end

    context "api_v1_scene_post_comments_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to have_http_status(200)
      end

      it "bodyにコメントが含まれていること" do
        expect(response.body).to include comment.body
      end
    end
  end

  describe "ユーザーのお気に入り数カウント機能" do
    let(:comic) { create(:comic) }
    let(:scene_post) { create(:scene_post, comic_id: comic.id) }
    let!(:favorite) { create(:favorite, scene_post_id: scene_post.id) }

    before do
      get favorites_count_api_v1_scene_post_comments_path(scene_post.id)
    end

    context "favorites_count_api_v1_scene_post_comments_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to have_http_status(200)
      end

      it "bodyにscene_post_idが含まれていること" do
        expect(response.body).to include favorite.scene_post_id.to_s
      end
    end
  end
end
