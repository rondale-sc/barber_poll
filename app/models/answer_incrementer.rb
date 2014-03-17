class AnswerIncrementer
  attr_reader :answers, :answer_class

  def initialize(answers, answer_class=Answer)
    @answers, @answer_class = answers, answer_class
  end

  def save
    answer = answer_class.find_by(id: selected_answer["id"])
    answer ?  answer.update_attributes(count: answer.count+1) : false
  end

  def selected_answer
    Array(answers).select{|answer| answer["selected"] }.first
  end
end
