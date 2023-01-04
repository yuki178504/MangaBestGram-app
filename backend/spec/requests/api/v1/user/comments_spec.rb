# encoding: utf-8
require 'rails_helper'

RSpec.describe "Api::V1::User::Comments", type: :request do
  let!(:current_user) { create(:user) }
  let(:headers) { { CONTENT_TYPE: 'application/json', ACCEPT: 'application/json', Authorization: 'jwt_test_token' } }
  let!(:comic) { create(:comic, user: current_user) }
  let!(:scene_post) { create(:scene_post, comic_id: comic.id, user: current_user) }
  let!(:comment) { create(:comment, scene_post_id: scene_post.id, user: current_user) }

  before do
    authorization_stub
  end

  describe "ログインユーザーのコメント閲覧機能" do
    let(:http_request) { get api_v1_user_scene_post_comments_path(scene_post.id), headers: headers }

    before do
      http_request
    end

    context "api_v1_user_scene_post_comments_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to be_successful
        expect(response).to have_http_status(200)
      end

      it "bodyにコメントが含まれていること" do
        expect(response.body).to include comment.body
      end
    end
  end

  describe "ログインユーザーのコメント新規作成" do
    let!(:request_hash) { { headers: headers, params: attributes_for(:comment).to_json } }
    let(:http_request) { post api_v1_user_scene_post_comments_path(scene_post.id), request_hash }

    context "api_v1_user_scene_post_comments_pathにアクセス時の正常系" do
      it "コメントの新規作成ができること" do
        expect{ http_request }.to change { current_user.comments.count }.by(1)
        expect(response).to be_successful
        expect(response).to have_http_status(200)
      end
    end

    context "api_v1_user_scene_post_comments_pathにアクセス時の異常系" do
      let!(:request_hash) { { headers: headers, params: attributes_for(:comment, body: "").to_json } }

      it "コメントが空欄の場合、新規作成されないこと" do
        http_request
        expect(response).to_not be_successful
      end
    end
  end

  describe 'ログインユーザーのコメント削除機能' do
    let!(:request_hash) { { headers: headers} }
    let(:http_request) { delete api_v1_user_comment_path(comment.id), request_hash }

    context 'api_v1_user_comment_pathにアクセス時に' do
      it 'コメントを削除できること' do
        expect{ http_request }.to change { current_user.comments.count }.by(-1)
        expect(response).to be_successful
        expect(response).to have_http_status(204)
      end
    end
  end
end
