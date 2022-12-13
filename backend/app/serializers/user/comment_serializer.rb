class User::CommentSerializer
  include JSONAPI::Serializer
  attributes :body, :user_id, :scene_post_id, :created_at

  attribute :comment_user_name do |object|
    object.user.name.to_s
  end

  attribute :comment_user_image do |object|
    object.user.image
  end
end
