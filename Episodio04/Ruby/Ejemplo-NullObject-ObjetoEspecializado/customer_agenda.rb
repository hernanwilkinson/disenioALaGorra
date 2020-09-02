class CustomerAgenda
  def initialize
    @customers = []
  end

  def add(customer)
    @customers.push customer
  end

  def customers_at(city)
    # Este ejemplo está rompiendo el encapsulamiento de Customer
    # pero no de Address para demostrar que Address::NOT_PROVIDED
    # puede tener comportamiento especializado
    @customers.select { |customer| customer.address.is_at city }
  end

  def customers_with_zip_code(zip_code)
    # Idem customers_at
    @customers.select { |customer| customer.address.has_zip_code zip_code }
  end
end