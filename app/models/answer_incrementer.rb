class AnswerIncrementer
  attr_reader :answers, :answer_class, :requestor_ip

  def initialize(answers, requestor_ip, answer_class=Answer)
    @answers = answers
    @requestor_ip = requestor_ip
    @answer_class = answer_class
  end

  def save
    answer = answer_class.find_by(id: selected_answer["id"])
    if answer && answer.can_vote?(requestor_ip)
      answer.update_attributes(count: answer.count+1)
    else
      false
    end
  end

  def selected_answer
    Array(answers).select{|answer| answer["selected"] }.first
  end
end
