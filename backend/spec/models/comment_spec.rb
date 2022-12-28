# encoding: utf-8
require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe "コメント作成" do
    context "異常系" do
      it "コメントがなければ登録できない" do
        comment = Comment.new(body: "")
        comment.valid?
        expect(comment.errors[:body]).to include("can't be blank")
      end
    end
  end
end
