class CustomerAgenda
  def initialize
    @customers = []
  end

  def add(customer)
    @customers.push customer
  end

  def customers_at(city)
    # Este ejemplo está rompiendo el encapsulamiento y por eso es que
    # hacer que address sea nil hace que esta implementación falle
    @customers.select { |customer| customer.address.city == city }
  end

  def customers_with_zip_code(zip_code)
    # Idem customers_at respecto a romper encapsulamiento y sus consecuencias
    @customers.select { |customer| customer.address.zip_code == zip_code }
  end
end