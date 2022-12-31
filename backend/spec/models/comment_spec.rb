# encoding: utf-8
require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe "コメント作成" do
    let(:comment) { Comment.new(body: "") }
    let(:comments) { create(:comment) }

    context "正常系" do
      it "コメントがあれば登録できる" do
        expect(comments).to be_valid
      end
    end
    context "異常系" do
      it "コメントがなければ登録できない" do
        comment.valid?
        expect(comment.errors[:body]).to include("can't be blank")
      end
    end
  end
  describe "アソシエーションテスト" do
    context "userモデルとの関係" do
      it "N:1となっている" do
        expect(Comment.reflect_on_association(:user).macro).to eq :belongs_to
      end
    end
    context "scene_postモデルとの関係" do
      it "N:1となっている" do
        expect(Comment.reflect_on_association(:scene_post).macro).to eq :belongs_to
      end
    end
  end
end
