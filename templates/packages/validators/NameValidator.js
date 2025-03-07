export default class NameValidator {

    static DefineElementIdByName(Name, EnumClass) {
        for (const EnumElement in EnumClass) {
            if (Object.prototype.hasOwnProperty.call(EnumClass, EnumElement)) {
                if (Name == EnumElement) {
                    return EnumClass[EnumElement];
                }
            }
        }
        return EnumClass.GetDefault();
    };

}
