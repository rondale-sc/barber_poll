class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :survey_id
      t.text :answer_text
      t.integer :count, default: 0

      t.timestamps
    end
  end
end
