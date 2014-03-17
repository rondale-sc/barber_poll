module TableStepHelpers
  def fill_in_with_table(table)
    table.rows_hash.each do |name, value|
      fill_in(name, with: value)
    end
  end
end

World(TableStepHelpers)
