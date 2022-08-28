class Course < ApplicationRecord
	has_many :variants, dependent: :destroy
	belongs_to :user
end
