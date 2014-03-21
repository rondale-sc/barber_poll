class Answer < ActiveRecord::Base
  belongs_to :survey

  delegate :voted_recently?, :register_vote, to: :redis_cache

  def can_vote?(requestor_ip)
    key = voted_redis_key(requestor_ip)
    if voted_recently?(key) && !survey.permissive_voting
      false
    else
      register_vote(key)
      true
    end
  end

  private

  def redis_cache
    RedisCache.new
  end

  def voted_redis_key(requestor_ip)
    "#{requestor_ip}-#{survey.id}"
  end
end
