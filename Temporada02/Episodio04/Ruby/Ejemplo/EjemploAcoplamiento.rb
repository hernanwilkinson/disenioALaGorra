require 'Date'

def hoy(calendar = Date)
  Date.today
end

def ahora(clock = Time)
  clock.now
end

puts hoy
puts ahora

class FixedClock
  def today
    Date.new 2022,1,1
  end
  def now
    Time.new 2022,1,1,0,0,0
  end
end

puts hoy FixedClock.new
puts ahora FixedClock.new