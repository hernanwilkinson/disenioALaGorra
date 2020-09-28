class Rot13Converter {
    private String toConvert;

    public Rot13Converter(String toConvert) {
        this.toConvert = toConvert;
    }

    public String execute() {
        int[] converted = toConvert.chars().
                map(this::asRot13).toArray();

        return new String(converted,0,converted.length);
    }

    private int asRot13(int charToConvert) {
        int upperCaseCharToConvert = Character.toUpperCase(charToConvert);
        if(isInFirstHalf(upperCaseCharToConvert))
            return charToConvert +13;
        if(isInSecondHalf(upperCaseCharToConvert))
            return charToConvert -13;

        return charToConvert;
    }

    private boolean isInSecondHalf(int upperCaseCharToConvert) {
        return upperCaseCharToConvert>='N' && upperCaseCharToConvert<='Z';
    }

    private boolean isInFirstHalf(int upperCaseCharToConvert) {
        return upperCaseCharToConvert>='A' && upperCaseCharToConvert<='M';
    }
}
