class ComicSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :genre, :image, :user_id, :created_at

  attribute :comic_user_name do |object|
    object.user.name.to_s
  end

  attribute :comic_user_image do |object|
    object.user.image
  end
end
