class Variant < ApplicationRecord
	belongs_to :course
	has_many :cards, dependent: :destroy
end
