/******************************************************************************

                            Online C Compiler.
                Code, Compile, Run and Debug C program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <stdio.h>

void arrayDoWithIndex(int arrayToIterate[], int arrayToIterateSize,void (*func)(int,int)) {
    for (int i = 0; i < arrayToIterateSize; i++) {
        (*func)(arrayToIterate[i],i);
    }
}

void arrayFilter(int arrayToFilter[], int arrayToFilterSize, int filteredArray[], int filteredArraySize, int* found,int (*condition)(int)) {

    *found = 0;
    if(*found >= filteredArraySize)
        return;

    for (int i = 0; i < arrayToFilterSize; i++) {
        if ((*condition)(arrayToFilter[i])) {
            filteredArray[(*found)++] = arrayToFilter[i];

            if(*found >= filteredArraySize)
                return;
        }
    }
}

int isEven(int number) {
    return number % 2 == 0;
}

void printEvens(int number, int index) {
    printf("even[%i]=%i\n", index, number);
}

int main()
{
    int numbers[] = { 1, 2, 3, 4, 5 };
    int even[] = { 0, 0, 0, 0, 0 };
    int evensFound = 0;

    arrayFilter(numbers, sizeof(numbers)/sizeof(int), even, sizeof(even)/sizeof(int), &evensFound, &isEven);
    arrayDoWithIndex(even,evensFound,&printEvens);

    return 0;
}
