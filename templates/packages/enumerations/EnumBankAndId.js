import EnumClass from "./EnumClass.js";

export default class EnumBankAndId extends EnumClass {
    static Sberbank = "sber-bank-logo";
    static Raffazen = "raff-bank-logo";
    static Tinkoff = "tinkoff-bank-logo";
    static YandexMoney = "yandex-bank-logo";
    static Rocketbank = "rocket-bank-logo";
    static Otkritie = "open-bank-logo";
    static Mts = "mts-bank-logo";
    static Gazprombank = "gaz-bank-logo";
    static Alphabank = "alpha-bank-logo";
    static Beeline = "beeline-bank-logo";

    static IsValid(EnumElement) {
        return Object.getOwnPropertyNames(this).includes(EnumElement);
    }
}
