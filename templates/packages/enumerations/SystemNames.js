import EnumClass from "./EnumClass.js";

export default class SystemNames extends EnumClass {
    static Mastercard = "Mastercard";
    static Visa = "Visa";
    static American = "American";
    static Mir = "Mir";
    static Maestro = "Maestro";
    static Union = "Union";
    static Paypal = "Paypal";

    static IsValid(EnumElement) {
        return Object.getOwnPropertyNames(this).includes(EnumElement);
    }
}
