def same_var_assigned_in_closure

  temp1 = 1
  a_closure = lambda { | ;temp1|
    temp1 = 10
    temp1 + 2 }
  [a_closure.call, temp1]

end

# Modifica temp1 o crea una nueva var temp1?
print same_var_assigned_in_closure
# Se puede definir una temp1 local al closure?
