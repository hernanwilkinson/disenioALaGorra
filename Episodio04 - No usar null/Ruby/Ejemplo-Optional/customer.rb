require 'rumonade'

class Customer

  INVALID_NAME = 'Name can not be empty'

  @name
  @address

  def self.named(name,address)
    raise Exception.new INVALID_NAME if name.empty?

    new name, Option(address)
  end

  def initialize(name,address)
    @name = name
    @address = address
  end

  def address
    @address
  end
end

