// =====================================================
// БАЗА ДАННЫХ СТАТЕЙ
// Поддерживает как пути к файлам, так и base64 данные
// Для статей без таблицы установите tableData: null
// =====================================================

const articlesDatabase = {
    nature: [
        {
            title: 'Горные вершины',
            date: '15 января 2024',
            views: '2,450',
            readTime: '5 мин',
            text: `
                <p>Горы — это величественные творения природы, которые на протяжении веков вдохновляли людей на подвиги и открытия. Их заснеженные вершины, уходящие в облака, символизируют стремление к высшим целям.</p>
                <p>Самые высокие горные системы мира — Гималаи, Анды, Альпы — привлекают миллионы туристов и альпинистов ежегодно. Каждая гора имеет свой характер, свою историю и свои легенды.</p>
                <p>Экосистемы горных регионов уникальны. Здесь обитают редкие виды животных и растений, адаптировавшиеся к суровым условиям высокогорья.</p>
            `,
            tableData: [
                { word: 'горы', count: 45 },
                { word: 'вершина', count: 38 },
                { word: 'снег', count: 32 },
                { word: 'альпинизм', count: 28 },
                { word: 'природа', count: 25 },
                { word: 'высота', count: 22 },
                { word: 'скалы', count: 18 },
                { word: 'облака', count: 15 },
                { word: 'восхождение', count: 12 },
                { word: 'пейзаж', count: 10 }
            ],
            // Файлы: можно указать путь ИЛИ base64 строку
            files: {
                summary: 'files/nature/mountains_summary.docx',
                full: 'files/nature/mountains_full.docx',
                table: 'files/nature/mountains_data.xlsx',
                audio: 'files/nature/mountains_audio.mp4'
                // Пример base64:
                // audio: 'data:audio/mp4;base64,AAAAIGZ0eXBpc29t...'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Гора'
        },
        {
            title: 'Лесные тропы',
            date: '18 января 2024',
            views: '1,890',
            readTime: '4 мин',
            text: `
                <p>Лесные тропы открывают перед путешественником удивительный мир живой природы. Шелест листвы, пение птиц и запах хвои создают неповторимую атмосферу умиротворения.</p>
                <p>Леса занимают около 31% суши нашей планеты и являются домом для 80% всех наземных видов животных и растений.</p>
            `,
            tableData: [
                { word: 'лес', count: 52 },
                { word: 'деревья', count: 44 },
                { word: 'тропа', count: 35 },
                { word: 'природа', count: 30 },
                { word: 'птицы', count: 25 },
                { word: 'листва', count: 20 },
                { word: 'грибы', count: 15 },
                { word: 'тишина', count: 12 }
            ],
            files: {
                summary: 'files/nature/forest_summary.docx',
                full: 'files/nature/forest_full.docx',
                table: 'files/nature/forest_data.xlsx',
                audio: 'files/nature/forest_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Лес'
        },
        {
            title: 'Озёра и реки',
            date: '22 января 2024',
            views: '3,210',
            readTime: '6 мин',
            text: `
                <p>Водные артерии нашей планеты — озёра и реки — источник жизни для миллиардов живых существ. Их кристально чистые воды отражают небо и окружающие пейзажи.</p>
                <p>Байкал — самое глубокое озеро в мире, содержащее 20% мировых запасов пресной воды.</p>
            `,
            tableData: null, // Таблица не будет отображаться
            files: {
                summary: 'files/nature/lakes_summary.docx',
                full: 'files/nature/lakes_full.docx',
                table: 'files/nature/lakes_data.xlsx',
                audio: 'files/nature/lakes_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Озеро'
        },
        {
            title: 'Рассветы',
            date: '25 января 2024',
            views: '4,560',
            readTime: '3 мин',
            text: `
                <p>Рассвет — это ежедневное чудо природы, момент, когда тьма отступает перед светом. Небо окрашивается в невероятные оттенки розового, оранжевого и золотого.</p>
            `,
            tableData: [
                { word: 'рассвет', count: 48 },
                { word: 'солнце', count: 42 },
                { word: 'небо', count: 38 },
                { word: 'утро', count: 30 },
                { word: 'краски', count: 25 },
                { word: 'горизонт', count: 20 }
            ],
            files: {
                summary: 'files/nature/sunrise_summary.docx',
                full: 'files/nature/sunrise_full.docx',
                table: 'files/nature/sunrise_data.xlsx',
                audio: 'files/nature/sunrise_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Рассвет'
        },
        {
            title: 'Закаты',
            date: '28 января 2024',
            views: '5,120',
            readTime: '3 мин',
            text: `
                <p>Закат — это поэзия природы, написанная красками неба. Каждый вечер солнце дарит нам уникальное представление, которое никогда не повторяется.</p>
            `,
            tableData: [
                { word: 'закат', count: 55 },
                { word: 'вечер', count: 40 },
                { word: 'солнце', count: 35 },
                { word: 'море', count: 28 },
                { word: 'романтика', count: 22 },
                { word: 'тишина', count: 18 },
                { word: 'отражение', count: 15 }
            ],
            files: {
                summary: 'files/nature/sunset_summary.docx',
                full: 'files/nature/sunset_full.docx',
                table: 'files/nature/sunset_data.xlsx',
                audio: 'files/nature/sunset_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Закат'
        },
        {
            title: 'Поля',
            date: '1 февраля 2024',
            views: '2,890',
            readTime: '4 мин',
            text: `
                <p>Бескрайние поля — это символ свободы и простора. Золотистые колосья пшеницы, фиолетовые ковры лаванды, жёлтые моря подсолнухов — каждое поле имеет свою красоту.</p>
            `,
            tableData: null, // Без таблицы
            files: {
                summary: 'files/nature/fields_summary.docx',
                full: 'files/nature/fields_full.docx',
                table: 'files/nature/fields_data.xlsx',
                audio: 'files/nature/fields_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Поле_(сельское_хозяйство)'
        }
    ],
    technology: [
        {
            title: 'Микрочипы',
            date: '5 февраля 2024',
            views: '8,450',
            readTime: '7 мин',
            text: `
                <p>Микрочипы — это сердце современной электроники. Эти крошечные кремниевые пластины содержат миллиарды транзисторов и управляют всем: от смартфонов до космических кораблей.</p>
                <p>История микрочипов началась в 1958 году, когда Джек Килби создал первую интегральную схему.</p>
            `,
            tableData: [
                { word: 'процессор', count: 62 },
                { word: 'транзистор', count: 55 },
                { word: 'кремний', count: 48 },
                { word: 'нанометр', count: 40 },
                { word: 'память', count: 35 },
                { word: 'технология', count: 30 },
                { word: 'производство', count: 25 },
                { word: 'инновации', count: 20 }
            ],
            files: {
                summary: 'files/tech/microchips_summary.docx',
                full: 'files/tech/microchips_full.docx',
                table: 'files/tech/microchips_data.xlsx',
                audio: 'files/tech/microchips_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Интегральная_схема'
        },
        {
            title: 'Сети',
            date: '8 февраля 2024',
            views: '6,780',
            readTime: '6 мин',
            text: `
                <p>Компьютерные сети связали весь мир в единое информационное пространство. От локальных сетей офисов до глобального интернета — данные путешествуют со скоростью света.</p>
            `,
            tableData: [
                { word: 'интернет', count: 70 },
                { word: 'сервер', count: 55 },
                { word: 'данные', count: 50 },
                { word: 'протокол', count: 42 },
                { word: 'скорость', count: 35 },
                { word: 'безопасность', count: 30 }
            ],
            files: {
                summary: 'files/tech/networks_summary.docx',
                full: 'files/tech/networks_full.docx',
                table: 'files/tech/networks_data.xlsx',
                audio: 'files/tech/networks_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Компьютерная_сеть'
        },
        {
            title: 'Компьютеры',
            date: '12 февраля 2024',
            views: '9,120',
            readTime: '8 мин',
            text: `
                <p>От первых ламповых гигантов до современных ультрабуков — эволюция компьютеров изменила мир. Сегодня вычислительная мощность смартфона превосходит все компьютеры NASA 1969 года.</p>
            `,
            tableData: null,
            files: {
                summary: 'files/tech/computers_summary.docx',
                full: 'files/tech/computers_full.docx',
                table: 'files/tech/computers_data.xlsx',
                audio: 'files/tech/computers_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Компьютер'
        },
        {
            title: 'Роботы',
            date: '15 февраля 2024',
            views: '11,340',
            readTime: '7 мин',
            text: `
                <p>Роботы перестали быть фантастикой и стали реальностью. Промышленные манипуляторы, хирургические системы, домашние помощники — они повсюду.</p>
            `,
            tableData: [
                { word: 'робот', count: 65 },
                { word: 'автоматизация', count: 52 },
                { word: 'искусственный интеллект', count: 48 },
                { word: 'производство', count: 40 },
                { word: 'будущее', count: 35 },
                { word: 'манипулятор', count: 28 },
                { word: 'программирование', count: 22 }
            ],
            files: {
                summary: 'files/tech/robots_summary.docx',
                full: 'files/tech/robots_full.docx',
                table: 'files/tech/robots_data.xlsx',
                audio: 'files/tech/robots_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Робот'
        },
        {
            title: 'Космос',
            date: '18 февраля 2024',
            views: '15,670',
            readTime: '9 мин',
            text: `
                <p>Космические технологии — вершина инженерной мысли человечества. От первого спутника до марсоходов и телескопа Джеймса Уэбба — мы постоянно расширяем границы познания.</p>
            `,
            tableData: [
                { word: 'космос', count: 75 },
                { word: 'ракета', count: 60 },
                { word: 'спутник', count: 55 },
                { word: 'орбита', count: 45 },
                { word: 'исследование', count: 40 },
                { word: 'планета', count: 35 },
                { word: 'звёзды', count: 30 },
                { word: 'галактика', count: 25 }
            ],
            files: {
                summary: 'files/tech/space_summary.docx',
                full: 'files/tech/space_full.docx',
                table: 'files/tech/space_data.xlsx',
                audio: 'files/tech/space_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Космонавтика'
        },
        {
            title: 'Серверы',
            date: '22 февраля 2024',
            views: '7,890',
            readTime: '6 мин',
            text: `
                <p>Серверные центры — это мозг современного интернета. Огромные залы, заполненные тысячами серверов, хранят и обрабатывают данные всего мира.</p>
            `,
            tableData: [
                { word: 'сервер', count: 58 },
                { word: 'данные', count: 50 },
                { word: 'хранение', count: 42 },
                { word: 'облако', count: 38 },
                { word: 'центр', count: 30 }
            ],
            files: {
                summary: 'files/tech/servers_summary.docx',
                full: 'files/tech/servers_full.docx',
                table: 'files/tech/servers_data.xlsx',
                audio: 'files/tech/servers_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Сервер_(аппаратное_обеспечение)'
        }
    ],
    architecture: [
        {
            title: 'Небоскрёбы',
            date: '25 февраля 2024',
            views: '6,450',
            readTime: '6 мин',
            text: `
                <p>Небоскрёбы — символ современных мегаполисов и торжество инженерной мысли. Бурдж-Халифа высотой 828 метров — самое высокое здание в мире.</p>
            `,
            tableData: [
                { word: 'небоскрёб', count: 60 },
                { word: 'высота', count: 52 },
                { word: 'архитектура', count: 45 },
                { word: 'стекло', count: 38 },
                { word: 'сталь', count: 32 },
                { word: 'лифт', count: 25 },
                { word: 'этаж', count: 20 }
            ],
            files: {
                summary: 'files/arch/skyscrapers_summary.docx',
                full: 'files/arch/skyscrapers_full.docx',
                table: 'files/arch/skyscrapers_data.xlsx',
                audio: 'files/arch/skyscrapers_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Небоскрёб'
        },
        {
            title: 'Мосты',
            date: '28 февраля 2024',
            views: '5,230',
            readTime: '5 мин',
            text: `
                <p>Мосты соединяют берега, страны и людей. От древних каменных арок до современных вантовых конструкций — каждый мост уникален.</p>
            `,
            tableData: [
                { word: 'мост', count: 55 },
                { word: 'конструкция', count: 45 },
                { word: 'река', count: 40 },
                { word: 'пролёт', count: 32 },
                { word: 'опора', count: 28 }
            ],
            files: {
                summary: 'files/arch/bridges_summary.docx',
                full: 'files/arch/bridges_full.docx',
                table: 'files/arch/bridges_data.xlsx',
                audio: 'files/arch/bridges_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Мост'
        },
        {
            title: 'Дома',
            date: '3 марта 2024',
            views: '4,120',
            readTime: '5 мин',
            text: `
                <p>Архитектура жилых домов отражает культуру и климат каждого региона. От японских минималистичных домов до средиземноморских вилл — разнообразие поражает.</p>
            `,
            tableData: null,
            files: {
                summary: 'files/arch/houses_summary.docx',
                full: 'files/arch/houses_full.docx',
                table: 'files/arch/houses_data.xlsx',
                audio: 'files/arch/houses_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Жилой_дом'
        },
        {
            title: 'Музеи',
            date: '6 марта 2024',
            views: '7,890',
            readTime: '7 мин',
            text: `
                <p>Музейная архитектура — это искусство создания пространства для искусства. Лувр, Гуггенхайм, Эрмитаж — эти здания сами являются экспонатами.</p>
            `,
            tableData: [
                { word: 'музей', count: 65 },
                { word: 'экспозиция', count: 50 },
                { word: 'искусство', count: 45 },
                { word: 'история', count: 38 },
                { word: 'коллекция', count: 32 },
                { word: 'выставка', count: 28 }
            ],
            files: {
                summary: 'files/arch/museums_summary.docx',
                full: 'files/arch/museums_full.docx',
                table: 'files/arch/museums_data.xlsx',
                audio: 'files/arch/museums_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Музей'
        },
        {
            title: 'Башни',
            date: '9 марта 2024',
            views: '5,670',
            readTime: '5 мин',
            text: `
                <p>Башни с древних времён служили символами власти и наблюдательными пунктами. Сегодня они стали туристическими достопримечательностями.</p>
            `,
            tableData: [
                { word: 'башня', count: 58 },
                { word: 'высота', count: 48 },
                { word: 'смотровая', count: 40 },
                { word: 'туризм', count: 35 }
            ],
            files: {
                summary: 'files/arch/towers_summary.docx',
                full: 'files/arch/towers_full.docx',
                table: 'files/arch/towers_data.xlsx',
                audio: 'files/arch/towers_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Башня'
        },
        {
            title: 'Города',
            date: '12 марта 2024',
            views: '9,340',
            readTime: '8 мин',
            text: `
                <p>Городская архитектура — это летопись человеческой цивилизации. Каждый город имеет свой неповторимый облик, сформированный веками.</p>
            `,
            tableData: [
                { word: 'город', count: 70 },
                { word: 'улица', count: 55 },
                { word: 'площадь', count: 48 },
                { word: 'район', count: 40 },
                { word: 'центр', count: 35 },
                { word: 'парк', count: 30 },
                { word: 'транспорт', count: 25 }
            ],
            files: {
                summary: 'files/arch/cities_summary.docx',
                full: 'files/arch/cities_full.docx',
                table: 'files/arch/cities_data.xlsx',
                audio: 'files/arch/cities_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Город'
        }
    ],
    art: [
        {
            title: 'Живопись',
            date: '15 марта 2024',
            views: '8,120',
            readTime: '7 мин',
            text: `
                <p>Живопись — древнейший вид изобразительного искусства, зародившийся ещё в пещерах первобытных людей. От наскальных рисунков до цифрового искусства — путь длиной в тысячелетия.</p>
            `,
            tableData: [
                { word: 'картина', count: 68 },
                { word: 'художник', count: 58 },
                { word: 'краски', count: 50 },
                { word: 'холст', count: 42 },
                { word: 'кисть', count: 35 },
                { word: 'стиль', count: 30 },
                { word: 'шедевр', count: 25 }
            ],
            files: {
                summary: 'files/art/painting_summary.docx',
                full: 'files/art/painting_full.docx',
                table: 'files/art/painting_data.xlsx',
                audio: 'files/art/painting_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Живопись'
        },
        {
            title: 'Скульптура',
            date: '18 марта 2024',
            views: '6,890',
            readTime: '6 мин',
            text: `
                <p>Скульптура оживляет камень, металл и дерево, превращая их в произведения искусства. От античных статуй до современных инсталляций — это искусство формы и пространства.</p>
            `,
            tableData: [
                { word: 'скульптура', count: 62 },
                { word: 'мрамор', count: 50 },
                { word: 'форма', count: 45 },
                { word: 'статуя', count: 40 },
                { word: 'бронза', count: 32 }
            ],
            files: {
                summary: 'files/art/sculpture_summary.docx',
                full: 'files/art/sculpture_full.docx',
                table: 'files/art/sculpture_data.xlsx',
                audio: 'files/art/sculpture_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Скульптура'
        },
        {
            title: 'Граффити',
            date: '21 марта 2024',
            views: '10,450',
            readTime: '5 мин',
            text: `
                <p>Граффити прошло путь от вандализма до признанного вида искусства. Бэнкси, Шепард Фейри и другие художники превратили улицы в галереи.</p>
            `,
            tableData: [
                { word: 'граффити', count: 72 },
                { word: 'стрит-арт', count: 60 },
                { word: 'стена', count: 52 },
                { word: 'баллончик', count: 45 },
                { word: 'город', count: 38 },
                { word: 'улица', count: 32 },
                { word: 'культура', count: 28 },
                { word: 'протест', count: 22 }
            ],
            files: {
                summary: 'files/art/graffiti_summary.docx',
                full: 'files/art/graffiti_full.docx',
                table: 'files/art/graffiti_data.xlsx',
                audio: 'files/art/graffiti_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Граффити'
        },
        {
            title: 'Инсталляции',
            date: '24 марта 2024',
            views: '7,560',
            readTime: '6 мин',
            text: `
                <p>Инсталляции — это искусство, которое окружает зрителя, погружая его в созданный художником мир. Это опыт, а не просто объект для созерцания.</p>
            `,
            tableData: null,
            files: {
                summary: 'files/art/installations_summary.docx',
                full: 'files/art/installations_full.docx',
                table: 'files/art/installations_data.xlsx',
                audio: 'files/art/installations_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Инсталляция_(искусство)'
        },
        {
            title: 'Музеи искусств',
            date: '27 марта 2024',
            views: '12,340',
            readTime: '8 мин',
            text: `
                <p>Музеи искусств — это храмы культуры, где собраны величайшие произведения человечества. Лувр, Метрополитен, Третьяковская галерея хранят бесценные сокровища.</p>
            `,
            tableData: [
                { word: 'музей', count: 75 },
                { word: 'коллекция', count: 62 },
                { word: 'экспонат', count: 55 },
                { word: 'галерея', count: 48 },
                { word: 'выставка', count: 40 },
                { word: 'искусство', count: 35 }
            ],
            files: {
                summary: 'files/art/artmuseums_summary.docx',
                full: 'files/art/artmuseums_full.docx',
                table: 'files/art/artmuseums_data.xlsx',
                audio: 'files/art/artmuseums_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Художественный_музей'
        },
        {
            title: 'Керамика',
            date: '30 марта 2024',
            views: '5,890',
            readTime: '5 мин',
            text: `
                <p>Керамика — одно из древнейших ремёсел, превратившееся в высокое искусство. От китайского фарфора до японской раку — традиции живут тысячелетия.</p>
            `,
            tableData: [
                { word: 'керамика', count: 58 },
                { word: 'глина', count: 50 },
                { word: 'обжиг', count: 42 },
                { word: 'гончар', count: 38 },
                { word: 'ваза', count: 30 },
                { word: 'глазурь', count: 25 }
            ],
            files: {
                summary: 'files/art/ceramics_summary.docx',
                full: 'files/art/ceramics_full.docx',
                table: 'files/art/ceramics_data.xlsx',
                audio: 'files/art/ceramics_audio.mp4'
            },
            externalLink: 'https://ru.wikipedia.org/wiki/Керамика'
        }
    ]
};


// =====================================================
// ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ
// =====================================================

// Получаем URL параметры
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('cat') || 'nature';
const categoryName = urlParams.get('name') || 'Категория';
const articleIndex = parseInt(urlParams.get('idx')) || 0;
const articleImage = urlParams.get('img') || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200';

// Получаем данные статьи из базы
const categoryArticles = articlesDatabase[category] || articlesDatabase.nature;
const article = categoryArticles[articleIndex] || categoryArticles[0];

// Обновляем элементы страницы
document.getElementById('article-title').textContent = article.title;
document.getElementById('article-breadcrumb').textContent = article.title;
document.getElementById('category-link').textContent = categoryName;
document.getElementById('category-link').href = `category.html?cat=${category}&name=${encodeURIComponent(categoryName)}`;
document.getElementById('back-link').href = `category.html?cat=${category}&name=${encodeURIComponent(categoryName)}`;
document.title = `СберПортал - ${article.title}`;

// Обновляем изображение (поддержка base64)
const articleImageEl = document.getElementById('article-image');
const imageUrl = getMediaUrl(articleImage, 'jpg');
if (imageUrl) {
    articleImageEl.src = imageUrl;
}

// Обновляем мета-данные
document.querySelector('.article-meta').innerHTML = `
    <span>📅 ${article.date}</span>
    <span>👁 ${article.views} просмотров</span>
    <span>⏱ ${article.readTime} чтения</span>
`;

// Обновляем текст статьи
document.getElementById('article-text').innerHTML = article.text;

// Обновляем ссылки скачивания (поддержка base64)
createDownloadLink(
    document.getElementById('download-summary'),
    article.files.summary,
    `${article.title}_краткое.docx`
);
createDownloadLink(
    document.getElementById('download-full'),
    article.files.full,
    `${article.title}_полное.docx`
);
createDownloadLink(
    document.getElementById('download-table'),
    article.files.table,
    `${article.title}_таблица.xlsx`
);
createDownloadLink(
    document.getElementById('download-audio'),
    article.files.audio,
    `${article.title}_аудио.mp4`
);

// Обновляем внешнюю ссылку
document.getElementById('external-link').href = article.externalLink;


// =====================================================
// ОБЛАКО СЛОВ И ТАБЛИЦА
// =====================================================

function renderWordCloud(data) {
    const container = document.getElementById('word-cloud');
    if (!data || data.length === 0) {
        container.innerHTML = '<p class="no-data">Нет данных для отображения</p>';
        return;
    }

    const maxCount = Math.max(...data.map(item => item.count));
    const minCount = Math.min(...data.map(item => item.count));
    const colors = ['#21A038', '#2FCEA0', '#1A8F32', '#25B84A', '#3DD9A8'];

    container.innerHTML = data.map(item => {
        const normalized = (item.count - minCount) / (maxCount - minCount || 1);
        const fontSize = 0.8 + normalized * 1.2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rotation = (Math.random() - 0.5) * 20;
        
        return `<span class="word-item" style="font-size: ${fontSize}rem; color: ${color}; transform: rotate(${rotation}deg);" title="Упоминаний: ${item.count}">${item.word}</span>`;
    }).join('');
}

function renderTable(data) {
    const tableBody = document.getElementById('table-body');
    if (!data || data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="2">Нет данных</td></tr>';
        return;
    }

    const sortedData = [...data].sort((a, b) => b.count - a.count);
    tableBody.innerHTML = sortedData.map(row => `
        <tr>
            <td>${row.word}</td>
            <td>${row.count}</td>
        </tr>
    `).join('');
}

// Проверка наличия данных для таблицы
if (article.tableData && article.tableData.length > 0) {
    renderWordCloud(article.tableData);
    renderTable(article.tableData);
} else {
    // Скрываем секцию графиков, если нет данных
    document.getElementById('chart-section').style.display = 'none';
}

// Toggle dropdown
function toggleDropdown(button) {
    const dropdown = button.closest('.dropdown');
    dropdown.classList.toggle('active');
    
    // Закрытие при клике вне dropdown
    document.addEventListener('click', function closeDropdown(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            document.removeEventListener('click', closeDropdown);
        }
    });
}

// Toggle table visibility
function toggleTable() {
    const expandBtn = document.querySelector('.expand-data');
    const table = document.getElementById('data-table');
    expandBtn.classList.toggle('active');
    table.classList.toggle('active');
}


// =====================================================
// АУДИО ПЛЕЕР С FALLBACK НА СИНТЕЗ РЕЧИ
// =====================================================

const audioElement = document.getElementById('articleAudio');
const listenBtn = document.getElementById('listenBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const listenBtnText = document.getElementById('listenBtnText');

let useAudioFile = false;
let audioFileChecked = false;
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let isSpeaking = false;
let isPausedSpeech = false;

// Установить источник аудио (поддержка base64)
if (article.files.audio) {
    const audioUrl = getMediaUrl(article.files.audio, 'mp4');
    if (audioUrl) {
        audioElement.src = audioUrl;
    }
}

// Проверка существования аудиофайла
function checkAudioFile() {
    return new Promise((resolve) => {
        if (!article.files.audio) {
            resolve(false);
            return;
        }
        
        // Если это base64, файл точно есть
        if (isBase64(article.files.audio)) {
            resolve(true);
            return;
        }
        
        // Проверяем доступность файла
        const testAudio = new Audio();
        testAudio.src = article.files.audio;
        
        testAudio.addEventListener('canplaythrough', () => {
            resolve(true);
        });
        
        testAudio.addEventListener('error', () => {
            resolve(false);
        });
        
        // Таймаут на случай медленной сети
        setTimeout(() => {
            resolve(false);
        }, 2000);
    });
}

// Получить текст для синтеза речи
function getTextForSpeech() {
    const textElement = document.getElementById('article-text');
    return textElement.innerText || textElement.textContent;
}

// Запуск синтеза речи
function startSpeechSynthesis() {
    if (!speechSynthesis) {
        alert('Ваш браузер не поддерживает синтез речи');
        return;
    }
    
    const text = getTextForSpeech();
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'ru-RU';
    currentUtterance.rate = 1.0;
    currentUtterance.pitch = 1.0;
    
    currentUtterance.onend = function() {
        resetButtonState();
        isSpeaking = false;
        isPausedSpeech = false;
    };
    
    currentUtterance.onerror = function() {
        resetButtonState();
        isSpeaking = false;
        isPausedSpeech = false;
    };
    
    speechSynthesis.speak(currentUtterance);
    isSpeaking = true;
}

// Сброс состояния кнопки
function resetButtonState() {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    listenBtnText.textContent = 'Прослушать краткое описание';
}

// Показать состояние воспроизведения
function showPlayingState() {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    listenBtnText.textContent = 'Пауза';
}

// Показать состояние паузы
function showPausedState() {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    listenBtnText.textContent = 'Продолжить';
}

// Переключение воспроизведения
async function toggleAudio() {
    // Проверяем наличие файла при первом клике
    if (!audioFileChecked) {
        audioFileChecked = true;
        useAudioFile = await checkAudioFile();
    }
    
    if (useAudioFile) {
        // Воспроизведение аудиофайла
        if (audioElement.paused) {
            audioElement.play();
            showPlayingState();
        } else {
            audioElement.pause();
            showPausedState();
        }
    } else {
        // Синтез речи
        if (!isSpeaking && !isPausedSpeech) {
            startSpeechSynthesis();
            showPlayingState();
        } else if (isSpeaking && !isPausedSpeech) {
            speechSynthesis.pause();
            isPausedSpeech = true;
            showPausedState();
        } else if (isPausedSpeech) {
            speechSynthesis.resume();
            isPausedSpeech = false;
            showPlayingState();
        }
    }
}

// Обработка окончания аудио
audioElement.addEventListener('ended', function() {
    resetButtonState();
    audioElement.currentTime = 0;
});

// Остановка всего аудио
function stopAllAudio() {
    audioElement.pause();
    audioElement.currentTime = 0;
    
    if (speechSynthesis) {
        speechSynthesis.cancel();
    }
    isSpeaking = false;
    isPausedSpeech = false;
}

// Остановка при уходе со страницы
window.addEventListener('beforeunload', stopAllAudio);

// Остановка при переходе по ссылкам
document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', stopAllAudio);
});
