class CreateSurveys < ActiveRecord::Migration
  def change
    create_table :surveys do |t|
      t.text :question

      t.timestamps
    end
  end
end
