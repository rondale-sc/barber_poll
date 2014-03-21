class Survey < ActiveRecord::Base
  has_many :answers

  validates :answers, length: { minimum: 2, message: "You must have at least 2 answers to create a poll."}

  accepts_nested_attributes_for :answers
end
