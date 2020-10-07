class Customer

  INVALID_NAME = 'Name can not be empty'

  @name
  @address

  def self.named(name,address)
    raise Exception.new INVALID_NAME if name.empty?

    new name, address
  end

  def initialize(name,address)
    @name = name
    @address = address
  end

  def is_at(city)
    with_address_do_if_none(
        lambda {|address| address.is_at city },
        lambda { false })
  end

  def has_zip_code(zip_code)
    with_address_do_if_none(
      lambda {|address| address.has_zip_code zip_code},
      lambda { false })
  end

  def with_address_do_if_none(existing_block,none_block)
    if @address == Address.not_provided
      none_block.call
    else
      existing_block.call @address
    end
  end
end
