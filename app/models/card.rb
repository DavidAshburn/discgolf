class Card < ApplicationRecord
	belongs_to :user
	belongs_to :variant
	has_one :course, through: :variant

end
