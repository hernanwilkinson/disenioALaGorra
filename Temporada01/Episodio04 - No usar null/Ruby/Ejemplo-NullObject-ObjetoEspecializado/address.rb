class Address
  INVALID_STREET = 'Street can not be empty'
  INVALID_CITY = 'City can not be empty'

  @street
  @city
  @zip_code

  def self.at(street, city, zip_code)
    raise Exception.new INVALID_STREET if street.empty?
    raise Exception.new INVALID_CITY if city.empty?

    new street,city,zip_code
  end

  def initialize(street, city, zip_code)
    @street = street
    @city = city
    @zip_code = zip_code
  end

  def city
    @city
  end

  def zip_code
    @zip_code
  end

  def is_at(city)
    @city == city
  end

  def has_zip_code(zip_code)
    @zip_code == zip_code
  end

  NOT_PROVIDED = new'','',''

  def NOT_PROVIDED.is_at(city)
    false
  end

  def NOT_PROVIDED.has_zip_code(zip_code)
    false
  end

end

