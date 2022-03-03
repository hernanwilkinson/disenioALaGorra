def same_var_defined_in_closure():
    temp1 = 1

    def a_lambda():
        nonlocal temp1
        temp1 = 10
        return temp1 + 2

    return [a_lambda(), temp1]

# Modifica temp1 o crea una nueva var temp1?
print(same_var_defined_in_closure())
# Se puede hacer que modifique temp1 del outer-context? nonlocal