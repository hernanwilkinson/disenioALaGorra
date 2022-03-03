def conditionally_defined_var(should_define_var):
    if should_define_var:
        temp1 = 1

    def a_lambda():
        return temp1 + 2

    return a_lambda()


print(conditionally_defined_var(True))
