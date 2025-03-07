export default class Formating {

    static FormatCard() {
        var elem = document.getElementById("card-number");
        elem.value = elem.value.replaceAll(/([0-9]{4}(?!\s))/gm, "$1 ");
    }

    static UnFormatCard() {
        var elem = document.getElementById("card-number");
        var search = /(?<found_space>[0-9]{4}\s)/gm;

        const array = search.exec(elem.value);

        if (array != null && array.groups["found_space"] != undefined) {
            elem.value = elem.value.replaceAll(" ", "");
        }
    }
}
