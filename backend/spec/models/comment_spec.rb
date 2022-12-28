# encoding: utf-8
require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe "コメント作成" do
    let(:comment) { Comment.new(body: "") }

    context "異常系" do
      it "コメントがなければ登録できない" do
        comment.valid?
        expect(comment.errors[:body]).to include("can't be blank")
      end
    end
  end
end
