json.extract! card, :id, :score, :user_id, :variant_id, :course_id, :shots, :created_at, :updated_at
json.url card_url(card, format: :json)
