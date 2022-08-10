class Course < ApplicationRecord
	has_many :variants
	belongs_to :user
end
