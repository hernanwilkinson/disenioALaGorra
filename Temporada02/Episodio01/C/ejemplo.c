/******************************************************************************

                            Online C Compiler.
                Code, Compile, Run and Debug C program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <stdio.h>
char* antes = "Antes";
char* palabras[3] = {"Hola", " ", "mundo"};
char* despues = "Despues";

int main()
{
    for(int i=0;i<3;i++)
        printf("%s", palabras[i]);

    return 0;
}
