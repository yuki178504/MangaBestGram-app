class ScenePostSerializer
  include JSONAPI::Serializer
  attributes :id, :scene_title, :scene_date, :scene_content, :scene_image, :user_id, :comic_id, :scene_number, :sub_title, :created_at

  attribute :scene_post_user_name do |object|
    object.user.name.to_s
  end

  attribute :scene_post_user_image do |object|
    object.user.image
  end

  attribute :scene_post_comic_title do |object|
    object.comic.title.to_s
  end
end
