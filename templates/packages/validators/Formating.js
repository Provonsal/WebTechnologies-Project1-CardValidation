export default class Formating {

    static FormatCard() {
        var elem = document.getElementById("card-number");

        let string = elem.value.split('');

        for (let i = 0, counter = 1; i < string.length; i++, counter++) {

            if (counter == 4 && string[i+1] != ' ' && i+1 != string.length) {
                string.splice(++i, 0, ' ');
                counter = 1;
                i++;
            } else if (counter == 4){
                counter = 0;
                i++;
            }
        }
        elem.value = String(string.join()).replaceAll(',','');

        //elem.value = elem.value.replaceAll(/([0-9]{4}(?!\s))/gm, "$1 ");
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
