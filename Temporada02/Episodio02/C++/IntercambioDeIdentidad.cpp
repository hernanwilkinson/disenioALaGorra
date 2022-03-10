/******************************************************************************

                              Online C++ Compiler.
               Code, Compile, Run and Debug C++ program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <iostream>

using namespace std;

class Mansion {
    public:
    virtual int numberOfRooms () {
        return 10;
    }
};

class Car {
    public:
    virtual int numberOfDoors () {
        return 2;
    }
};

int main()
{
    Mansion myHouse;
    Car myFerrari;

    cout << myHouse.numberOfRooms() << endl;
    cout << myFerrari.numberOfDoors() << endl;

    Mansion* poorMansion = (Mansion*) &myFerrari;
    cout << (*poorMansion).numberOfRooms() << endl;


    return 0;
}
