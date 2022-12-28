# encoding: utf-8
require 'rails_helper'

RSpec.describe Comic, type: :model do
  describe "漫画新規作成" do
    let(:comic) { Comic.new(title: "", genre: "") }
    let(:user) { FactoryBot.create(:user) }
    let(:comics) { user.comics.build( title: "ワンピース", genre: "アドベンチャー" ) }

    context "正常系" do
      it "タイトルとジャンルがあれば登録できる" do
        expect(comics).to be_valid
      end
    end
    context "異常系" do
      it "タイトルがなければ登録できない" do
        comic.valid?
        expect(comic.errors[:title]).to include("can't be blank")
      end

      it "ジャンルがなければ登録できない" do
        comic.valid?
        expect(comic.errors[:genre]).to include("can't be blank")
      end
    end
  end
  describe "アソシエーションテスト" do
    context "userモデルとの関係" do
      it "N:1となっている" do
        expect(Comic.reflect_on_association(:user).macro).to eq :belongs_to
      end
    end
    context "scene_postモデルとの関係" do
      it "1:Nとなっている" do
        expect(Comic.reflect_on_association(:scene_posts).macro).to eq :has_many
      end
    end
  end
end
