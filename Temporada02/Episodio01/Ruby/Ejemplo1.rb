def var_defined_before_closure

  temp1 = 1
  a_closure = lambda { temp1 + 2 }
  a_closure.call

end

print var_defined_before_closure
