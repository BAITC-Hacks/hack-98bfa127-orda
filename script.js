const products = [
    {
        article: "EKT-001",
        name: "Кабель ВВГ 3x2.5",
        price: 850,
        stock: 120
    },
    {
        article: "EKT-002",
        name: "Кабель ВВГнг 3x2.5",
        price: 990,
        stock: 65
    },
    {
        article: "EKT-003",
        name: "Автоматты ажыратқыш 16A",
        price: 2450,
        stock: 32
    },
    {
        article: "EKT-004",
        name: "LED шам 12W",
        price: 1250,
        stock: 0
    }
];

function sendMessage() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chatMessages");

    if (!input || !chat) {
        alert("HTML элементтері табылмады!");
        return;
    }

    const text = input.value.trim();

    if (text === "") return;

    // Клиенттің хабары
    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.textContent = text;
    chat.appendChild(userMessage);

    input.value = "";

    // Агент жауабы
    setTimeout(() => {
        const answer = getAIAnswer(text);

        const botMessage = document.createElement("div");
        botMessage.className = "message bot";
        botMessage.innerHTML = answer;

        chat.appendChild(botMessage);
        chat.scrollTop = chat.scrollHeight;
    }, 400);

    chat.scrollTop = chat.scrollHeight;
}

function getAIAnswer(text) {
    const q = text.toLowerCase();

    // Сәлемдесу
    if (
        q.includes("сәлем") ||
        q.includes("салем") ||
        q.includes("привет")
    ) {
        return `
            Сәлем! 👋<br><br>
            Мен EKT AI ассистентімін.<br>
            Қандай тауар іздеп жүрсіз?
        `;
    }

    // Каталог
    if (
        q.includes("каталог") ||
        q.includes("тауарлар")
    ) {
        let result = "<b>📦 Каталог:</b><br><br>";

        products.forEach(product => {
            result += `
                <b>${product.name}</b><br>
                Артикул: ${product.article}<br>
                Бағасы: ${product.price} ₸<br>
                Қоймада: ${product.stock > 0 ? product.stock : "жоқ"}
                <br><br>
            `;
        });

        return result;
    }

    // Жеткізу
    if (
        q.includes("жеткізу") ||
        q.includes("доставка")
    ) {
        return `
            🚚 <b>Жеткізу</b><br><br>
            Қазақстан бойынша жеткізу қарастырылған.
            Бағасы мен мерзімі қалаға және тапсырыс көлеміне байланысты.
        `;
    }

    // Тауарды артикул бойынша іздеу
    const product = products.find(p =>
        q.includes(p.article.toLowerCase())
    );

    if (product) {
        if (product.stock > 0) {
            return `
                📦 <b>${product.name}</b><br><br>
                Артикул: ${product.article}<br>
                💰 Бағасы: ${product.price} ₸<br>
                ✅ Қоймада: ${product.stock} дана
            `;
        } else {
            return `
                📦 <b>${product.name}</b><br><br>
                Артикул: ${product.article}<br>
                💰 Бағасы: ${product.price} ₸<br>
                ❌ Қазіргі уақытта қоймада жоқ.<br><br>
                Қаласаңыз, аналогын таңдап бере аламын.
            `;
        }
    }

    // Кабель
    if (q.includes("кабель")) {
        return `
            🔌 Кабельдер бар.<br><br>
            Мысалы:<br>
            <b>EKT-001 — Кабель ВВГ 3x2.5</b><br>
            Бағасы: 850 ₸<br>
            Қоймада: 120 метр.<br><br>
            Толық ақпарат үшін <b>EKT-001</b> деп жазыңыз.
        `;
    }

    return `
        🤖 Сұрағыңызды түсіндім, бірақ тауарды анықтай алмадым.<br><br>
        Мысалы:<br>
        • <b>EKT-001 бар ма?</b><br>
        • <b>Кабель керек</b><br>
        • <b>Каталогты көрсет</b><br>
        • <b>Жеткізу шарттары қандай?</b>
    `;
}

// Enter арқылы жіберу
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("userInput");

    if (input) {
        input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }
});