def var_defined_after_closure():
    def a_lambda():
        return temp1 + 2

    temp1 = 1
    return a_lambda()


print(var_defined_after_closure())