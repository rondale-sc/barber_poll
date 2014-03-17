World(Module.new do
  def wait_for_ajax
    wait_until_script '$.active == 0'
  end

  def wait_until_script script, wait=Capybara.default_wait_time
    Timeout::timeout wait do
      sleep 0.2 until page.evaluate_script <<-JS
        typeof($) == 'function' && #{script}
      JS
    end
  end
end)
