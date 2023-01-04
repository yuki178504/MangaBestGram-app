# encoding: utf-8
require 'rails_helper'

RSpec.describe "Api::V1::User::ScenePost", type: :request do
  let!(:current_user) { create(:user) }
  let(:headers) { { CONTENT_TYPE: 'application/json', ACCEPT: 'application/json', Authorization: 'jwt_test_token' } }
  let!(:comic) { create(:comic, user: current_user) }
  let!(:scene_post) { create(:scene_post, comic_id: comic.id, user: current_user) }

  before do
    authorization_stub
  end

  describe "ログインユーザーのシーン閲覧機能" do
    let(:http_request) { get api_v1_user_comic_scene_posts_path(comic.id), headers: headers }

    before do
      http_request
    end

    context "api_v1_user_comic_scene_posts_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to be_successful
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

  describe "ログインユーザーのシーンの詳細を閲覧する機能" do
    let(:http_request) { get api_v1_user_scene_post_path(scene_post.id), headers: headers }

    before do
      http_request
    end

    context "api_v1_user_scene_post_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to be_successful
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

  describe "ログインユーザーのシーン新規作成" do
    let!(:request_hash) { { headers: headers, params: attributes_for(:scene_post).to_json } }
    let(:http_request) { post api_v1_user_comic_scene_posts_path(comic.id), request_hash }

    context "api_v1_user_comic_scene_posts_pathにアクセス時の正常系" do
      it "シーンの新規作成ができること" do
        expect{ http_request }.to change { current_user.scene_posts.count }.by(1)
        expect(response).to be_successful
        expect(response).to have_http_status(200)
      end
    end

    context "api_v1_user_comic_scene_posts_pathにアクセス時の異常系" do
      let!(:request_hash) { { headers: headers, params: attributes_for(:scene_post, sub_title: "", scene_title: "").to_json } }

      it "シーンのサブタイトルと内容が空欄の場合、新規作成されないこと" do
        http_request
        expect(response).to_not be_successful
      end
    end
  end

  describe 'ログインユーザーのシーン編集機能' do
    let!(:request_hash) { { headers: headers, params: { sub_title: 'チェンジ' }.to_json } }
    let(:http_request) { put api_v1_user_scene_post_path(scene_post.id), request_hash }

    context 'api_v1_user_scene_post_pathにアクセス時に' do
      it 'シーンの編集ができること' do
        http_request
        expect(response).to be_successful
        expect(response).to have_http_status(204)
      end
    end
  end

  describe 'ログインユーザーのシーン削除機能' do
    let!(:request_hash) { { headers: headers} }
    let(:http_request) { delete api_v1_user_scene_post_path(scene_post.id), request_hash }

    context 'api_v1_user_scene_post_pathにアクセス時に' do
      it 'シーンを削除できること' do
        expect{ http_request }.to change { current_user.scene_posts.count }.by(-1)
        expect(response).to be_successful
        expect(response).to have_http_status(204)
      end
    end
  end
end
