def conditionally_defined_var(should_define_var)

  if should_define_var
    temp1 = 1
  end

  a_closure = lambda { temp1 + 2 }
  a_closure.call

end

print conditionally_defined_var false
#que pasa con false?