
def localReturn
  lambda = lambda { return 10 }
  return lambda.call + 5
end

def nonLocalReturn
  fullClosure = proc { return 10 }
  return fullClosure.call + 5
end

print localReturn
print "\n"
print nonLocalReturn

