import EnumClass from "./EnumClass.js";


export default class SystemIds extends EnumClass {
    static Mastercard = "mastercard_card_logo";
    static Visa = "visa_card_logo";
    static American = "american_card_logo";
    static Mir = "mir_card_logo";
    static Maestro = "maestro_card_logo";
    static Union = "unionpay_card_logo";
    static Paypal = "paypal_card_logo";

    static IsValid(EnumElement) {
        return Object.getOwnPropertyNames(this).includes(EnumElement);
    }
}
