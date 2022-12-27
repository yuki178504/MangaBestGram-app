# encoding: utf-8
require 'rails_helper'

RSpec.describe Comic, type: :model do
  describe "漫画新規作成" do
    context "異常系" do
      it "タイトルがなければ登録できない" do
        comic = Comic.new(title: "")
        comic.valid?
        expect(comic.errors[:title]).to include("can't be blank")
      end

      it "ジャンルがなければ登録できない" do
        comic = Comic.new(genre: "")
        comic.valid?
        expect(comic.errors[:genre]).to include("can't be blank")
      end
    end
  end
end
