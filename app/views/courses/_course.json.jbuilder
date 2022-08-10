json.extract! course, :id, :name, :city, :state, :created_at, :updated_at
json.url course_url(course, format: :json)
