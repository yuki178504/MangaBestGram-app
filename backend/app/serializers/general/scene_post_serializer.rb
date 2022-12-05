class General::ScenePostSerializer
  include JSONAPI::Serializer
  attributes :id, :scene_title, :scene_date, :scene_content, :scene_image, :user_id, :comic_id, :scene_number, :sub_title

  # rubocop:disable Style/ClassVars
  def initialize(resource, options = {})
    @@current_user = options[:current_user]
    super(resource)
  end
  # rubocop:enable Style/ClassVars

  attribute :scene_post_user_name do |object|
    object.user.name.to_s
  end

  attribute :scene_post_user_image do |object|
    object.user.image
  end

  attribute :favorite do |scene_post|
    if @@current_user.nil?
      'Not Login'
    else
      @@current_user.favorite?(scene_post)
    end
  end
end
