# encoding: utf-8
require 'rails_helper'

RSpec.describe Favorite, type: :model do
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
