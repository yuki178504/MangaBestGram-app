# encoding: utf-8
require 'rails_helper'

RSpec.describe "Api::V1::Comics", type: :request do
  describe "非ログインユーザーの漫画閲覧機能" do
    let!(:comic) { create(:comic) }
    let!(:related_comics) { create_list(:comic, 4) }

    context "/api/v1/comicsにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        get "/api/v1/comics"
        expect(response).to have_http_status(200)
      end

      it "全ての漫画のデータを取得できること" do
        get "/api/v1/comics"
        json = JSON.parse(response.body)
        expect(json['data'].length).to eq(5)
      end

      it "bodyに漫画のタイトルが含まれていること" do
        get "/api/v1/comics"
        expect(response.body).to include comic.title
      end

      it "bodyに漫画のジャンルが含まれていること" do
        get "/api/v1/comics"
        expect(response.body).to include comic.genre
      end
    end
    context "/api/v1/comics/latestにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        get "/api/v1/comics/latest"
        expect(response).to have_http_status(200)
      end

      it "bodyに漫画のタイトルが含まれていること" do
        get "/api/v1/comics/latest"
        expect(response.body).to include comic.title
      end

      it "bodyに漫画のジャンルが含まれていること" do
        get "/api/v1/comics/latest"
        expect(response.body).to include comic.genre
      end

      it "表示される漫画のデータが2つであること" do
        get "/api/v1/comics/latest"
        json = JSON.parse(response.body)
        expect(json['data'].length).to eq(2)
      end
    end
  end
end
