class ScenePostSerializer
  include JSONAPI::Serializer
  attributes :id, :scene_title, :scene_date, :scene_content, :scene_image, :user_id, :comic_id, :scene_number

  attribute :scene_post_user_name do |object|
    object.user.name.to_s
  end

  attribute :scene_post_user_image do |object|
    object.user.image
  end
end