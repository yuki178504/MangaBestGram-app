# encoding: utf-8
require 'rails_helper'

RSpec.describe Favorite, type: :model do
  describe "お気に入り登録" do
    subject { favorite.valid? }
    let(:favorite) { build(:favorite) }
    let!(:related_favorite) { create(:favorite) }

    context "正常系" do
      it "投稿にお気に入り登録できる" do
        expect(favorite).to be_valid
      end
    end
    context "異常系" do
      it "2つ以上の投稿にお気に入り登録できないこと" do
        favorite.user = related_favorite.user
        favorite.scene_post = related_favorite.scene_post
        is_expected.to eq false
      end
    end
  end
  describe "アソシエーションテスト" do
    context "userモデルとの関係" do
      it "N:1となっている" do
        expect(Favorite.reflect_on_association(:user).macro).to eq :belongs_to
      end
    end
    context "scene_postモデルとの関係" do
      it "N:1となっている" do
        expect(Favorite.reflect_on_association(:scene_post).macro).to eq :belongs_to
      end
    end
  end
end
