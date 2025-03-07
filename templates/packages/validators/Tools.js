import DefaultValidators from "./DefaultValidators.js";

export default class Tools {

    static WhichGroupHasFound(groups) {
        for (const groupName in groups) {
            if (!DefaultValidators.IsUndefined(groups[groupName])) {
                return groupName;
            }
        }
    };
}

