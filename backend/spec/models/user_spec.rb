# encoding: utf-8
require 'rails_helper'

RSpec.describe User, type: :model do
  describe "アソシエーションテスト" do
    context "comicモデルとの関係" do
      it "1:Nとなっている" do
        expect(User.reflect_on_association(:comics).macro).to eq :has_many
      end
    end
    context "scene_postモデルとの関係" do
      it "1:Nとなっている" do
        expect(User.reflect_on_association(:scene_posts).macro).to eq :has_many
      end
    end
    context "scene_postモデルとの関係" do
      it "N:Nとなっている" do
        expect(User.reflect_on_association(:favorite_scene_posts).macro).to eq :has_many
      end
    end
    context "favoriteモデルとの関係" do
      it "1:Nとなっている" do
        expect(User.reflect_on_association(:favorites).macro).to eq :has_many
      end
    end
    context "commentモデルとの関係" do
      it "1:Nとなっている" do
        expect(User.reflect_on_association(:comments).macro).to eq :has_many
      end
    end
  end
end
