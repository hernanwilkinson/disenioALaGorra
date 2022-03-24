
def some_function(un_array=[]):
    return un_array


un_array = some_function()
print(un_array)

un_array.append(10)
print(some_function())
