{

Online Pascal Compiler.Code, Compile,
    Run and Debug Pascal program online.Write your code in this editor and
    press "Run" button to execute it. $RANGECHECKS ON
}

program Hello;

var numeros: array[1..3] of integer;
var i: integer;

begin
    numeros[1]:= 100;
    numeros[2]:= 200;
    numeros[3]:= 300;

    for i:= 1 to 3 do
        writeln ('numeros[', i, '] = ', numeros[i]);
end.
