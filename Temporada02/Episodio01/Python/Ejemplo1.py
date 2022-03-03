def var_defined_before_closure():
    temp1 = 1

    def a_lambda():
        return temp1 + 2
    #a_lambda = lambda: temp1 + 2 --> equivalente

    return a_lambda()

print(var_defined_before_closure())

