class CustomerAgenda
  def initialize
    @customers = []
  end

  def add(customer)
    @customers.push customer
  end

  def customers_at(city)
    @customers.select do |customer| 
      customer.address.map { |address| address.city == city }.get_or_else(false) end
  end

  def customers_with_zip_code(zip_code)
    @customers.select do |customer| 
      customer.address.map { |address| address.zip_code == zip_code }.get_or_else(false)
    end
  end
end