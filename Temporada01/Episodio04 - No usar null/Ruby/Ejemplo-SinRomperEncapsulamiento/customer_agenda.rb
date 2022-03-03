class CustomerAgenda
  def initialize
    @customers = []
  end

  def add(customer)
    @customers.push customer
  end

  def customers_at(city)
    @customers.select do |customer|
      customer.is_at(city)
    end
  end

  def customers_with_zip_code(zip_code)
    @customers.select do |customer|
      customer.has_zip_code zip_code
    end
  end
end