import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

//Esto es tal cual quedó la implementación de los tests en el episidio
//Falta nombrar los tests, algo que haremos en el episidio 7
public class Rot13Test {
    @Test
    public void test01() {
        assertEquals("",asRot13(""));
    }
    @Test
    public void test02() {
        assertEquals("N",asRot13("A"));
    }
    @Test
    public void test03() {
        assertEquals("NN",asRot13("AA"));
    }
    @Test
    public void test04() {
        assertEquals("Z",asRot13("M"));
    }
    @Test
    public void test05() {
        assertEquals("A",asRot13("N"));
    }
    @Test
    public void test06() {
        assertEquals("M",asRot13("Z"));
    }
    @Test
    public void test07() {
        assertEquals("[",asRot13("["));
    }
    @Test
    public void test08() {
        assertEquals("@",asRot13("@"));
    }
    @Test
    public void test09() {
        assertEquals("n",asRot13("a"));
    }
    @Test
    public void test10() {
        assertEquals("a",asRot13("n"));
    }

    private String asRot13(String toConvert) {
        return new Rot13Converter(toConvert).execute();
    }

}
