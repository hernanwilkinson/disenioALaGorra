package sintaxis_distinta;

import java.util.Optional;

public class ExampleIf {
    public static void main(String[] args) {
        if (args==null) {
            System.out.println("sin argumentos");
        } else {
            System.out.println(args.length);
        }

        Optional<String[]> optionalArgs = Optional.ofNullable(args);

        optionalArgs.ifPresentOrElse(
                providedArgs-> { System.out.println(providedArgs.length); },
                ()-> { System.out.println("sin argumentos"); });
    }
}
