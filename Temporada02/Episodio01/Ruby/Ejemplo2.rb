def var_defined_after_closure

  a_closure = lambda { temp1 + 2 }
  temp1 = 1
  a_closure.call

end

print var_defined_after_closure
