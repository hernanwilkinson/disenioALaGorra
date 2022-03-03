<?php
function var_defined_after_closure() {
    //$a_closure = fn() => $temp1 + 2;
    $a_closure = function() use ($temp1) { return $temp1 + 2; };
    $temp1 = 1;
    return $a_closure();
}

print var_defined_after_closure();