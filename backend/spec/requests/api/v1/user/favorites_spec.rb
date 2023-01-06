# encoding: utf-8
require 'rails_helper'

RSpec.describe "Api::V1::User::Favorites", type: :request do
  let!(:current_user) { create(:user) }
  let(:headers) { { CONTENT_TYPE: 'application/json', ACCEPT: 'application/json', Authorization: 'jwt_test_token' } }
  let(:comic) { create(:comic, user: current_user) }
  let(:scene_post) { create(:scene_post, comic_id: comic.id, user: current_user) }
  let!(:related_scene_post) { create(:scene_post, comic_id: comic.id) }
  let!(:favorite) { create(:favorite, scene_post_id: scene_post.id, user: current_user) }

  before do
    authorization_stub
  end

  describe "ログインユーザーのお気に入り閲覧機能" do
    let(:http_request) { get api_v1_user_favorites_path, headers: headers }

    before do
      http_request
    end

    context "api_v1_user_favorites_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to have_http_status(200)
      end

      it "bodyにscene_post_idが含まれていること" do
        expect(response.body).to include favorite.scene_post_id.to_s
      end
    end
  end

  describe "ログインユーザーのお気に入り登録機能" do
    let!(:request_hash) { { headers: headers, params: {scene_post_id: related_scene_post.id}.to_json } }
    let(:http_request) { post api_v1_user_favorites_path, request_hash }

    context "api_v1_user_favorites_pathにアクセス時の正常系" do
      it "投稿にお気に入り登録ができること" do
        expect{ http_request }.to change { current_user.favorites.count }.by(1)
        expect(response).to be_successful
        expect(response).to have_http_status(204)
      end
    end
  end

  describe 'ログインユーザーのお気に入り削除機能' do
    let!(:request_hash) { { headers: headers} }
    let(:http_request) { delete api_v1_user_favorite_path(scene_post.id), request_hash }

    context 'api_v1_user_favorite_pathにアクセス時に' do
      it '登録したお気に入りを削除できること' do
        expect{ http_request }.to change { current_user.favorites.count }.by(-1)
        expect(response).to be_successful
        expect(response).to have_http_status(204)
      end
    end
  end
end
