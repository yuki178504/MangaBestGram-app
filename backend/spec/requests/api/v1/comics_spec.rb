# encoding: utf-8
require 'rails_helper'

RSpec.describe "Api::V1::Comics", type: :request do
  describe "非ログインユーザーの漫画閲覧機能" do
    let!(:comic) { create(:comic) }
    let!(:related_comics) { create_list(:comic, 4) }

    before do
      get api_v1_comics_path
    end

    context "api_v1_comics_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to have_http_status(200)
      end

      it "全ての漫画のデータを取得できること" do
        json = JSON.parse(response.body)
        expect(json['data'].length).to eq(5)
      end

      it "bodyに漫画のタイトルが含まれていること" do
        expect(response.body).to include comic.title
      end

      it "bodyに漫画のジャンルが含まれていること" do
        expect(response.body).to include comic.genre
      end
    end
  end

  describe "非ログインユーザーの漫画閲覧一覧を10つに限定した機能" do
    let!(:comic) { create(:comic) }
    let!(:related_comics) { create_list(:comic, 10) }

    before do
      get latest_api_v1_comics_path
    end

    context "latest_api_v1_comics_pathにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        expect(response).to have_http_status(200)
      end

      it "bodyに漫画のタイトルが含まれていること" do
        expect(response.body).to include comic.title
      end

      it "bodyに漫画のジャンルが含まれていること" do
        expect(response.body).to include comic.genre
      end

      it "表示される漫画のデータが10つであること" do
        json = JSON.parse(response.body)
        expect(json['data'].length).to eq(10)
      end
    end
  end
end
