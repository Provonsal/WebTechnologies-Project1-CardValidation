export default class EnumClass {

    static Unknown = "Unknown";

    static GetDefault() {
        return this.Unknown;
    }

    static IsDefault(EnumElement) {
        return EnumElement == this.Unknown;
    }

    static IsValid(EnumElement) {
        return Object.getOwnPropertyNames(this).includes(EnumElement);
    }
}
