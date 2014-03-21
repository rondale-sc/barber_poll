class Answer < ActiveRecord::Base
  belongs_to :survey

  def can_vote?(requestor_ip)
    if voted_recently?(requestor_ip) && !survey.permissive_voting
      false
    else
      register_vote(requestor_ip)
      true
    end
  end

  private

  def voted_recently?(requestor_ip)
    $redis[voted_redis_key(requestor_ip)] == "true"
  end

  def register_vote(requestor_ip)
    $redis.set(voted_redis_key(requestor_ip), true)
    $redis.expireat(voted_redis_key(requestor_ip), 2.hours.from_now.to_i)
  end

  def voted_redis_key(requestor_ip)
    "#{requestor_ip}-#{survey.id}"
  end
end
