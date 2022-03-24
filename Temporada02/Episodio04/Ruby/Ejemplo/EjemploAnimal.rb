
class Animal
  def self.hola
    'Hola! Soy un ' + self.tipo_de_animal
  end

  def self.tipo_de_animal
    'Implementar en las subclasses!'
  end
end

class Perro < Animal
  def self.hola
    super + ' gua gua'
  end
  def self.tipo_de_animal
    'Perro'
  end
end

class Gato < Animal
  def self.tipo_de_animal
    'Gato'
  end
end

class Veterinaria
  def hola_desde(un_tipo_de_animal)
    un_tipo_de_animal.hola
  end
end

puts Perro.tipo_de_animal
puts Gato.tipo_de_animal

una_veterinaria = Veterinaria.new
puts una_veterinaria.hola_desde Perro
puts una_veterinaria.hola_desde Gato

## IMPLEMENTAR hola en Perro ##