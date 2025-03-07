import ApiCheckBin from "../api/ApiCheckBin.js";
import Bank from "./Bank.js";
import CardNumber from "./CardNumber.js";
import CardSystem from "./CardSystem.js";
import SystemNames from "../enumerations/SystemNames.js";
import EnumBankAndId from "../enumerations/EnumBankAndId.js";
import Tools from "../validators/Tools.js";

export default class Card {

    #CardNumber;
    #Bank;
    #CardSystem;
    //`/(?<${SystemNames.Mastercard}>^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720))|(?<${SystemNames.Visa}>^4(?:[0-9]{3})?)|(?<${SystemNames.American}>^3[47])|(?<${SystemNames.Mir}>^220[0-4])|(?<${SystemNames.Union}>^62)|(?<${SystemNames.Maestro}>5018|5020|5038|5893|6304|6759|6761|6762|6763)/gm`
    #SystemCardRegex = RegExp(`(?<${SystemNames.Mastercard}>^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720))|(?<${SystemNames.Visa}>^4(?:[0-9]{3})?)|(?<${SystemNames.American}>^3[47])|(?<${SystemNames.Mir}>^220[0-4])|(?<${SystemNames.Union}>^62)|(?<${SystemNames.Maestro}>5018|5020|5038|5893|6304|6759|6761|6762|6763)`, "gm");
    #BankRegex = /^(?<bin>[0-9]{6})/gm;

    get CardNumber() { return this.#CardNumber; };
    get Bank() { return this.#Bank; };
    get CardSystem() { return this.#CardSystem; };
    
    set CardNumber(newNumber) { 

        this.#ParseCardNum(newNumber);
    };

    set Bank(newBank){
        this.#Bank = newBank;
        this.#Bank.ChangeBankImageAndBackground();
    }

    set CardSystem(newSystem) {
        this.#CardSystem = newSystem;
        this.#CardSystem.ChangeCardImage();
    }

    #ParseCardNum(number) {

        this.#CardNumber = new CardNumber(number);
    
        this.CardSystem = this.#GetCardSystemFromCardNumber();
    
        this.Bank = this.#GetBankFromCardNumber();
    }
    
    #GetBankFromCardNumber(){
        
        const result = RegExp(this.#BankRegex).exec(this.#CardNumber.Number);

        if (result != null) {
            
            return new ApiCheckBin().GetResponse(result.groups["bin"]);
        } else {
            return new Bank(
                EnumBankAndId.GetDefault(),
                "#498ee4"
            );
        }
    }
    
    #GetCardSystemFromCardNumber() {
        
        const result = this.#SystemCardRegex.exec(this.#CardNumber.Number);

        // Если что то нашло,
        if (result != null) {
            
            let system_name = Tools.WhichGroupHasFound(result.groups);

            if (SystemNames.IsValid(system_name)) {
                return new CardSystem(system_name);
            } else {
                return new CardSystem(SystemNames.GetDefault());
            }
        } else {
            return new CardSystem(SystemNames.GetDefault());
        }
        
    }

    constructor(CardNumber) {
        this.CardNumber = CardNumber.replaceAll(" ", "");
    };
}

export function InitCard() {
    const elem = document.getElementById("card-number");
    new Card(elem.value);
}
