json.extract! card, :id, :score, :shots, :user_id, :variant_id, :created_at, :updated_at
json.url card_url(card, format: :json)
