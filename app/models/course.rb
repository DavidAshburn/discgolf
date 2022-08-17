class Course < ApplicationRecord
	has_many :variants, dependent: :destroy
	has_many :cards, through: :variants
	belongs_to :user

end
