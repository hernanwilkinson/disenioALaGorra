package weak_typing;

class Mansion {
    public int numberOfRooms () {
        return 10;
    }
}
class Car {
    public int numberOfDoors () {
        return 2;
    }
}

public class Example {

    public static void main(String[] args) {
        Mansion myHouse = new Mansion();
        Car myFerrari = new Car();

        System.out.println(myHouse.numberOfRooms());
        System.out.println(myFerrari.numberOfDoors());

        Object poorMansion = myFerrari;
        System.out.println(((Mansion) poorMansion).numberOfRooms());

    }
}
