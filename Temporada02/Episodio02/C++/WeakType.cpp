/******************************************************************************

                              Online C++ Compiler.
               Code, Compile, Run and Debug C++ program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <iostream>

using namespace std;

int main()
{
    long aLong = 1234567890123456789; // 0x112210F47DE98115
    int anInt = aLong;
    long anotherLong = anInt;
    char* aCharPtr = (char*) &aLong;

    cout << aLong << endl;
    cout << anInt << endl;
    cout << anotherLong << endl;
    cout << (int) aCharPtr[0] << endl; // 0x15
    cout << hex << (int) aCharPtr[0] << endl; // 0x15

    return 0;
}
