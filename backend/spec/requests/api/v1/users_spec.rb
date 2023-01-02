# encoding: utf-8
require 'rails_helper'

RSpec.describe "Api::V1::ScenePosts", type: :request do
  describe "ユーザーの情報一覧閲覧機能" do
    let!(:user) { create(:user) }

    before do
      get api_v1_users_path
    end

    context "api_v1_users_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to have_http_status(200)
      end

      it "bodyにAuth0のトークンが含まれていること" do
        expect(response.body).to include user.sub
      end

      it "bodyにユーザー名が含まれていること" do
        expect(response.body).to include user.name
      end

      it "bodyに自己紹介が含まれていること" do
        expect(response.body).to include user.introduction
      end

      it "bodyにURLが含まれていること" do
        expect(response.body).to include user.url
      end
    end
  end

  describe "ユーザーの情報詳細閲覧機能" do
    let!(:user) { create(:user) }

    before do
      get api_v1_user_path(user.id)
    end

    context "api_v1_user_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to have_http_status(200)
      end

      it "bodyにAuth0のトークンが含まれていること" do
        expect(response.body).to include user.sub
      end

      it "bodyにユーザー名が含まれていること" do
        expect(response.body).to include user.name
      end

      it "bodyに自己紹介が含まれていること" do
        expect(response.body).to include user.introduction
      end

      it "bodyにURLが含まれていること" do
        expect(response.body).to include user.url
      end
    end
  end
end
