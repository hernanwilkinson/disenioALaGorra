<?php

function var_defined_before_closure() {
    $temp1 = 1;
    //$a_closure = fn() => $temp1 + 2;
    $a_closure = function() use ($temp1) { return $temp1 + 2; };
    return $a_closure();
}

print var_defined_before_closure();
//use