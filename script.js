const wheel = document.getElementById("wheel"), // Получает элемент canvas с id "wheel" и сохраняет его в переменной wheel
    spinBtn = document.getElementById("spin-btn"), // Получает кнопку с id "spin-btn" и сохраняет её в переменной spinBtn
    finalValue = document.getElementById("final-value"); // Получает элемент с id "final-value" и сохраняет его в переменной finalValue

// Значения минимального и максимального угла для каждого значения
const rotationValues = [ // Создает массив объектов, каждый из которых содержит минимальный и максимальный угол и соответствующее значение
    { minDegree: 0, maxDegree: 30, value: 2 }, // Угол от 0 до 30 соответствует значению 2
    { minDegree: 31, maxDegree: 90, value: 1 }, // Угол от 31 до 90 соответствует значению 1
    { minDegree: 91, maxDegree: 150, value: 6 }, // Угол от 91 до 150 соответствует значению 6
    { minDegree: 151, maxDegree: 210, value: 5 }, // Угол от 151 до 210 соответствует значению 5
    { minDegree: 211, maxDegree: 270, value: 4 }, // Угол от 211 до 270 соответствует значению 4
    { minDegree: 271, maxDegree: 330, value: 3 }, // Угол от 271 до 330 соответствует значению 3
    { minDegree: 331, maxDegree: 360, value: 2 }, // Угол от 331 до 360 соответствует значению 2
];

// Размеры частей колеса
const data = [16, 16, 16, 16, 16, 16]; // Создает массив, представляющий размеры частей колеса (в данном случае все части равны 16)

// Цвета фона частей
var pieColors = [ // Создает массив цветов для частей колеса
    "#1565c0", // Цвет для первой части
    "#2196f3", // Цвет для второй части
    "#1565c0", // Цвет для третьей части
    "#2196f3", // Цвет для четвертой части
    "#1565c0", // Цвет для пятой части
    "#2196f3", // Цвет для шестой части
];

// Мы используем круговую диаграмму для колеса, поэтому давайте создадим её
let myChart = new Chart(wheel, { // Создает новый экземпляр диаграммы Chart, используя элемент canvas "wheel"
    // Отображение текста на круговой диаграмме
    plugins: [ChartDataLabels], // Подключает плагин для отображения меток данных на диаграмме
    type: "pie", // Устанавливает тип диаграммы на "pie" (круговая диаграмма)
    data: {
        // Значения на диаграмме
        labels: [1, 2, 3, 4, 5, 6], // Устанавливает метки для частей диаграммы
        datasets: [ // Создает массив наборов данных для диаграммы
            {
                backgroundColor: pieColors, // Устанавливает цвета фона для частей диаграммы из массива pieColors
                data: data, // Устанавливает данные для диаграммы из массива data
            },
        ],
    },
    options: {
        // Дизайн диаграммы, адаптирующийся к размеру экрана
        responsive: true, // Устанавливает диаграмму как адаптивную
        animation: { duration: 0 }, // Отключает анимацию при отрисовке диаграммы
        plugins: {
            tooltip: false, // Отключает всплывающие подсказки при наведении на части диаграммы
            legend: {
                display: false, // Отключает отображение легенды диаграммы
            },
            // Показывает метки внутри круговой диаграммы
            datalabels: {
                color: "#ffffff", // Устанавливает цвет меток данных на белый
                formatter: (_, context) => context.chart.data.labels[context.dataIndex], // Форматирует метки, отображая соответствующую метку из массива labels
                font: { size: 24 }, // Устанавливает размер шрифта меток данных на 24
            },
        },
    },
});

// Отображает значение на основе случайного угла

const valueGenerator = (angleValue) => { // Функция для генерации значения на основе угла
    for (let i of rotationValues) { // Проходит по каждому объекту в массиве rotationValues
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) { // Проверяет, попадает ли угол в диапазон minDegree и maxDegree
            finalValue.innerHTML = `<p>Value: ${i.value}</p>`; // Отображает соответствующее значение в элементе finalValue
            spinBtn.disabled = false; // Активирует кнопку spinBtn
            break; // Выходит из цикла, если значение найдено
        }
    }
};

// Счетчик вращений
let count = 0; // Инициализирует счетчик вращений
// 100 вращений для анимации и последнее вращение для результата
let resultValue = 101; // Устанавливает начальное значение для вращения

// Начинает вращение
spinBtn.addEventListener("click", () => { // Добавляет обработчик события на кнопку spinBtn
    spinBtn.disabled = true; // Отключает кнопку spinBtn, чтобы предотвратить повторные нажатия
    finalValue.innerHTML = `<p>Good Luck!</p>`; // Отображает сообщение "Good Luck!" в элементе finalValue
    // Генерирует случайный угол, на котором остановится вращение
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0); // Генерирует случайное значение от 0 до 355
    // Интервал для анимации вращения
    let rotationInterval = window.setInterval(() => { // Устанавливает интервал для обновления вращения
        myChart.options.rotation = myChart.options.rotation + resultValue; // Увеличивает угол вращения диаграммы
        myChart.update(); // Обновляет диаграмму с новым значением вращения
        // Если вращение больше 360, сбрасывает его обратно на 0
        if (myChart.options.rotation >= 360) { // Проверяет, превышает ли угол 360 градусов
            count += 1; // Увеличивает счетчик вращений
            resultValue -= 5; // Уменьшает значение вращения для следующего обновления
            myChart.options.rotation = 0; // Сбрасывает угол вращения на 0
        } else if (count > 15 && myChart.options.rotation == randomDegree) { // Проверяет, если счетчик больше 15 и угол равен случайному углу
            valueGenerator(randomDegree); // Вызывает функцию для отображения значения на основе случайного угла
            clearInterval(rotationInterval); // Останавливает интервал вращения
            count = 0; // Сбрасывает счетчик вращений
            resultValue = 101; // Сбрасывает значение вращения на 101
        }
    }, 10); // Интервал обновления каждые 10 миллисекунд
});