/******************************************************************************

                            Online C Compiler.
                Code, Compile, Run and Debug C program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <stdio.h>
#include <stdarg.h>

void arrayDoWithIndex(int arrayToIterate[], int arrayToIterateSize,void (*func)(int,int,va_list), ...) {
    for (int i = 0; i < arrayToIterateSize; i++) {
        va_list otherArgs;
        va_start(otherArgs,func);
        (*func)(arrayToIterate[i],i,otherArgs);
        va_end(otherArgs);
    }

}

void arrayFilterCondition(int number, int index,va_list otherArgs) {
    int (*condition)(int) = va_arg(otherArgs,int (*)(int));
    if((*condition)(number)) {
        int* found = va_arg(otherArgs,int*);
        int filteredArraySize = va_arg(otherArgs,int);
        if(*found == filteredArraySize)
            return;

        int* filteredArray = va_arg(otherArgs,int*);
        filteredArray[(*found)++] = number;
    }
}
void arrayFilter(int arrayToFilter[], int arrayToFilterSize, int filteredArray[], int filteredArraySize, int* found,int (*condition)(int)) {

    *found = 0;

    arrayDoWithIndex(arrayToFilter, arrayToFilterSize,&arrayFilterCondition,condition,found, filteredArraySize,filteredArray);
}

int isEven(int number) {
    return number % 2 == 0;
}

void printEvens(int number, int index,va_list otherArgs) {
    char* format = va_arg(otherArgs,char*);
    printf(format, index, number);
}

int main()
{
    int numbers[] = { 1, 2, 3, 4, 6 };
    int even[] = { 0, 0, 0, 0, 0 };
    int evensFound = 0;

    arrayFilter(numbers, sizeof(numbers)/sizeof(int), even, sizeof(even)/sizeof(int), &evensFound, &isEven);

    printf("Encontrados: %i\n", evensFound);
    for (int i = 0; i < evensFound; i++) {
       printf("even[%i]=%i\n", i, even[i]);
    }

    arrayDoWithIndex(even,evensFound,&printEvens,"even[%i]=%i\n");

    return 0;
}
