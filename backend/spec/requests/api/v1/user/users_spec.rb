# encoding: utf-8
require 'rails_helper'

RSpec.describe "Api::V1::User::Users", type: :request do
  let!(:current_user) { create(:user) }
  let(:headers) { { CONTENT_TYPE: 'application/json', ACCEPT: 'application/json', Authorization: 'jwt_test_token' } }

  before do
    authorization_stub
  end

  describe "ログインユーザーのプロフィール閲覧機能" do
    let(:http_request) { get api_v1_user_users_path, headers: headers }

    before do
      http_request
    end

    context "api_v1_user_users_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to have_http_status(200)
      end

      it "bodyにログインユーザーのAuth0のトークンが含まれていること" do
        expect(response.body).to include current_user.sub
      end

      it "bodyにログインユーザーのユーザー名が含まれていること" do
        expect(response.body).to include current_user.name
      end

      it "bodyにログインユーザーの自己紹介が含まれていること" do
        expect(response.body).to include current_user.introduction
      end

      it "bodyにログインユーザーのURLが含まれていること" do
        expect(response.body).to include current_user.url
      end
    end
  end

  describe "ログインユーザーのプロフィールの詳細を閲覧する機能" do
    let(:http_request) { get api_v1_user_user_path(current_user.id), headers: headers }

    before do
      http_request
    end

    context "api_v1_user_user_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to be_successful
        expect(response).to have_http_status(200)
      end

      it "bodyにログインユーザーのAuth0のトークンが含まれていること" do
        expect(response.body).to include current_user.sub
      end

      it "bodyにログインユーザーのユーザー名が含まれていること" do
        expect(response.body).to include current_user.name
      end

      it "bodyにログインユーザーの自己紹介が含まれていること" do
        expect(response.body).to include current_user.introduction
      end

      it "bodyにログインユーザーのURLが含まれていること" do
        expect(response.body).to include current_user.url
      end
    end
  end

  describe 'ログインユーザーのプロフィール編集機能' do
    let!(:request_hash) { { headers: headers, params: { name: 'チェンジ' }.to_json } }
    let(:http_request) { put api_v1_user_user_path(current_user.id), request_hash }

    context 'api_v1_user_user_pathにアクセス時に' do
      it 'プロフィールの編集ができること' do
        http_request
        expect(response).to be_successful
        expect(response).to have_http_status(204)
      end
    end
  end
end
