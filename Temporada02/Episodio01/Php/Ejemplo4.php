<?php

function conditionally_defined_var($should_define_var) {

    if ($should_define_var)
        $temp1 = 1;

    $a_closure = function() use ($temp1) { return $temp1 + 2; };

    return $a_closure();
}

print conditionally_defined_var(true);