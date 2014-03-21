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
end
