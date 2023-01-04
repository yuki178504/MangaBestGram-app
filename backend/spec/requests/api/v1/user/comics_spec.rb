# encoding: utf-8
require 'rails_helper'

RSpec.describe "Api::V1::User::Comics", type: :request do
  let!(:current_user) { create(:user) }
  let(:headers) { { CONTENT_TYPE: 'application/json', ACCEPT: 'application/json', Authorization: 'jwt_test_token' } }
  let!(:comic) { create(:comic, user: current_user) }

  before do
    authorization_stub
  end

  describe "ログインユーザーの漫画閲覧機能" do
    let(:http_request) { get api_v1_user_comics_path, headers: headers }

    before do
      http_request
    end

    context "api_v1_comics_pathにアクセス時に" do
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

  describe "ログインユーザーの漫画新規作成" do
    let!(:request_hash) { { headers: headers, params: attributes_for(:comic).to_json } }
    let(:http_request) { post api_v1_user_comics_path, request_hash }

    context "api_v1_comics_pathにアクセス時の正常系" do
      it "漫画の新規作成ができること" do
        expect{ http_request }.to change { current_user.comics.count }.by(1)
        expect(response).to be_successful
        expect(response).to have_http_status(200)
      end
    end

    context "api_v1_comics_pathにアクセス時の異常系" do
      let!(:request_hash) { { headers: headers, params: attributes_for(:comic, title: "", genre: "").to_json } }

      it "漫画のタイトルとジャンルが空欄の場合、新規作成されないこと" do
        http_request
        expect(response).to_not be_successful
      end
    end
  end

  describe 'ログインユーザーの漫画編集機能' do
    let!(:request_hash) { { headers: headers, params: { title: 'チェンジ' }.to_json } }
    let(:http_request) { put api_v1_user_comic_path(comic.id), request_hash }

    context 'api_v1_user_comic_pathにアクセス時に' do
      it '漫画の編集ができること' do
        http_request
        expect(response).to be_successful
        expect(response).to have_http_status(204)
      end
    end
  end

  describe 'ログインユーザーの漫画削除機能' do
    let!(:request_hash) { { headers: headers} }
    let(:http_request) { delete api_v1_user_comic_path(comic.id), request_hash }

    context 'api_v1_user_comic_pathにアクセス時に' do
      it '漫画を削除できること' do
        expect{ http_request }.to change { current_user.comics.count }.by(-1)
        expect(response).to be_successful
        expect(response).to have_http_status(204)
      end
    end
  end
end
