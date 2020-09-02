require 'minitest/autorun'
require './customer'
require './address'
require './customer_agenda'

class ExampleTest < MiniTest::Unit::TestCase
  def assert_raises_with_message(exception_type, message, &block)
    exception = assert_raises exception_type, &block
    assert_equal exception.message, message
  end

  def test_can_not_create_address_with_empty_street
    assert_raises_with_message(Exception,
                               Address::INVALID_STREET) { Address.at "", olivos, olivos_zip_code }
  end

  def test_can_not_create_address_with_empty_city
    assert_raises_with_message(Exception,
                               Address::INVALID_CITY) { Address.at 'Maipu 111', '', olivos_zip_code }
  end

  def test_can_not_create_customer_with_empty_name
    assert_raises_with_message(Exception,
      Customer::INVALID_NAME) { Customer.named'', address_at_olivos }
  end

  def test_can_look_for_customers_in_a_city
    agenda = CustomerAgenda.new
    customer_at_olivos = Customer.named 'Pepe Sanchez', address_at_olivos
    customer_without_address = Customer.named 'Juan Perez', address_not_provided

    agenda.add customer_at_olivos
    agenda.add customer_without_address

    customers_at_olivos = agenda.customers_at olivos

    assert_equal 1, customers_at_olivos.length
    assert_equal customer_at_olivos, customers_at_olivos.first
  end

  def test_can_look_for_customers_in_a_zip_code
    agenda = CustomerAgenda.new
    customer_at_olivos = Customer.named 'Pepe Sanchez', address_at_olivos
    customer_without_address = Customer.named 'Juan Perez', address_not_provided

    agenda.add customer_at_olivos
    agenda.add customer_without_address

    customers_at_olivos = agenda.customers_with_zip_code olivos_zip_code

    assert_equal 1, customers_at_olivos.length
    assert_equal customer_at_olivos, customers_at_olivos.first
  end

  private

  def olivos
    'Olivos'
  end

  def olivos_zip_code
    '1636'
  end

  def address_at_olivos
    Address.at 'Maipu 111', olivos, olivos_zip_code
  end

  def address_not_provided
    Address::NOT_PROVIDED
  end
end
