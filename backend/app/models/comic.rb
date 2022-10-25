class Comic < ApplicationRecord
  belongs_to :user
  has_many :comics, dependent: :destroy
end
