# encoding: utf-8
require 'rails_helper'

RSpec.describe "Api::V1::Comments", type: :request do
  describe "非ログインユーザーのコメント閲覧機能" do
    let!(:comment) { create(:comment) }
    let(:scene_post) { create(:scene_post) }

    context "/api/v1/scene_posts/:scene_post_id/commentsにアクセス時に" do
      it "正常にレスポンスを返すこと" do
        get api_v1_scene_post_comments_path(scene_post.id)
        expect(response).to have_http_status(200)
      end
    end
  end
end
