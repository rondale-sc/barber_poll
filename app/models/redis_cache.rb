class RedisCache
  attr_reader :cache

  def initialize(cache: $redis)
    @cache = cache
  end

  def voted_recently?(key)
    cache[key] == "true"
  end

  def register_vote(key)
    cache.set(key, true)
    cache.expireat(key, 2.hours.from_now.to_i)
  end

  def publish_answers(survey_id, answers)
    payload = publish_answer_payload(survey_id, answers)
    cache.publish("survey_channel", payload)
  end

  private

  def publish_answer_payload(survey_id, answers)
    { survey_id: survey_id,
      answers: answers }.to_json
  end
end
