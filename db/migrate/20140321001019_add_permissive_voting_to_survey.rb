class AddPermissiveVotingToSurvey < ActiveRecord::Migration
  def change
    add_column :surveys, :permissive_voting, :boolean
  end
end
