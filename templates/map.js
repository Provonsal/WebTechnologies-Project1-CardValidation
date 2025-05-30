function parseCookies() {
    const cookieString = document.cookie;
    const cookies = {};
    
    if (cookieString) {
        cookieString.split("; ").forEach(pair => {
            const [key, value] = pair.split("=");
            cookies[key] = decodeURIComponent(value);
        });
    }

    return cookies;
}

function addCookie(key, json_value) {
    document.cookie = key+ "=" + encodeURIComponent(JSON.stringify(json_value)) + "; max-age=86400; path=/";
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

// let coock = Object.keys(parseCookies());

// for (const cookie of coock) {
//     deleteCookie(cookie);
// }

// let card1 = { number: "1111 1111 1111 1111", date: "05/28", cvv: "228", code_iso: "RU-KYA" };
// let card2 = { number: "2222 2222 2222 2222", date: "05/28", cvv: "228", code_iso: "RU-KYA" };
// let card3 = { number: "3333 3333 3333 3333", date: "05/28", cvv: "228", code_iso: "RU-SA" };
// let card4 = { number: "4444 4444 4444 4444", date: "05/28", cvv: "228", code_iso: "RU-SA" };

// addCookie("card1", card1);
// addCookie("card2", card2);
// addCookie("card3", card3); 
// addCookie("card4", card4);

// Загрузка SVG файла
fetch('russia.svg')  // замени на свой путь к SVG файлу
    .then(response => response.text())
    .then(svgText => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svgElement = svgDoc.querySelector("svg");

        // Вставляем в контейнер
        const container = document.getElementById("map-container");
        container.appendChild(svgElement);

        // Закрашиваем все регионы
        for (const element of svgElement.children) {
            element.style.fill = '#008B8B';
        }

        console.log(svgElement);

        // Обработка кликов по элементам на карте
        svgElement.addEventListener("click", function (event) {
            const target = event.target;
            if (target.hasAttribute("title")) {
                const region = target.getAttribute("title");
                alert(`Вы нажали на: (${region})`);
            }
        });

        // Обработка ховера (наведения)
        svgElement.addEventListener("mousemove", function (event) {
            const target = event.target; // целевой регион
            const tooltip = document.getElementById("tooltip"); // элемент всплывающего текста названия региона
            const cards_list_container = document.getElementById("cards-info"); // контейнер списока карт
            if (target.hasAttribute("title")) {
                
                // если контейнер информации о картах найден
                if (cards_list_container){

                    // очищаем список карт
                    cards_list_container.querySelectorAll("li").forEach(el => el.remove());
                    
                    // получаем элемент ul с классом cards-list
                    let list_element = cards_list_container.getElementsByClassName("cards-list")[0];

                    // парсим куки из строки куковской в объект ключ:значение и берем из него 
                    // список всех значений
                    let cookies = Object.values(parseCookies());

                    // идем циклом по кукам
                    for (const Card of cookies) {
                        // парсим в json строку карты
                        let parsed_card = JSON.parse(Card);

                        // если совпадает карта с элементом на который наведена мышка
                        // то добавляем к списку карт
                        if (target.getAttribute("id") == parsed_card["code_iso"]){
                            
                            // создаем элемент списка
                            let elem = document.createElement("li");
                            // добавляем ему в текст номер карты
                            elem.textContent = parsed_card["number"];
                            // добавляем элемент списка к списку
                            list_element.appendChild(elem);
                        }
                    }
                }
                    
                // отображаем карты
                cards_list_container.style.display = "block";

                // выставляем координаты относительно того где курсор
                cards_list_container.style.left = (event.pageX - 45) + "px";
                cards_list_container.style.top = (event.pageY + 20) + "px";

                // отображаем подсказку с текстом
                tooltip.style.display = "block";

                // достаем название из региона и засовываем его в текст подсказки
                tooltip.textContent = target.getAttribute("title");

                // выставляем координаты относительно того где курсор
                tooltip.style.left = (event.pageX + 10) + "px";
                tooltip.style.top = (event.pageY - 25) + "px";
            } else {
                // прячем и список и подсказку
                cards_list_container.style.display = "none";
                tooltip.style.display = "none";
            }
        });

        // событие наведения мыши
        svgElement.addEventListener('mouseover', function (event) {
            event.target.style.fill = '#CD5C5C';
        });

        // событие, когда мышь покидает элемент
        svgElement.addEventListener('mouseout', function (event) {
            event.target.style.fill = '#008B8B';
        });

    })
    .catch(err => console.error("Ошибка загрузки SVG:", err));