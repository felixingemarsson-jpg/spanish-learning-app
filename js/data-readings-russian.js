const DATA_READINGS = [
  // ─── Pre-A1 (8 passages) ─────────────────────────────────────────────────────

  {
    id: "reading-prea1-001",
    level: "Pre-A1",
    title: "Привет!",
    text: "Привет! Меня зовут Анна. Я студентка. Мне двадцать лет.",
    english: "Hi! My name is Anna. I am a student. I am twenty years old.",
    questions: [
      { sentence: "Меня зовут ___.", answer: "Анна", hint: "her name" },
      { sentence: "Мне ___ лет.", answer: "двадцать", hint: "her age" }
    ]
  },
  {
    id: "reading-prea1-002",
    level: "Pre-A1",
    title: "Семья",
    text: "Это моя семья. Это мама и папа. Это мой брат Иван. Мы живём в Москве.",
    english: "This is my family. This is mum and dad. This is my brother Ivan. We live in Moscow.",
    questions: [
      { sentence: "Мой брат — это ___.", answer: "Иван", hint: "a name" },
      { sentence: "Мы живём в ___.", answer: "Москве", hint: "a city" }
    ]
  },
  {
    id: "reading-prea1-003",
    level: "Pre-A1",
    title: "Цвета",
    text: "Небо голубое. Трава зелёная. Снег белый. Солнце жёлтое.",
    english: "The sky is blue. The grass is green. Snow is white. The sun is yellow.",
    questions: [
      { sentence: "Небо ___.", answer: "голубое", hint: "the colour of the sky" },
      { sentence: "Трава ___.", answer: "зелёная", hint: "the colour of grass" }
    ]
  },
  {
    id: "reading-prea1-004",
    level: "Pre-A1",
    title: "Числа",
    text: "Один, два, три, четыре, пять. У меня три кошки и две собаки. Всего пять животных.",
    english: "One, two, three, four, five. I have three cats and two dogs. Five animals in total.",
    questions: [
      { sentence: "У меня ___ кошки и две собаки.", answer: "три", hint: "a number" },
      { sentence: "Всего ___ животных.", answer: "пять", hint: "the total count" }
    ]
  },
  {
    id: "reading-prea1-005",
    level: "Pre-A1",
    title: "Еда",
    text: "Я люблю хлеб и молоко. Моя мама готовит суп. Суп вкусный.",
    english: "I like bread and milk. My mum makes soup. The soup is tasty.",
    questions: [
      { sentence: "Я люблю ___ и молоко.", answer: "хлеб", hint: "a staple food" },
      { sentence: "Суп ___.", answer: "вкусный", hint: "how it tastes" }
    ]
  },
  {
    id: "reading-prea1-006",
    level: "Pre-A1",
    title: "Школа",
    text: "Это школа. В школе есть классы и библиотека. Я учусь в третьем классе. Мне нравится школа.",
    english: "This is a school. The school has classrooms and a library. I am in the third grade. I like school.",
    questions: [
      { sentence: "В школе есть классы и ___.", answer: "библиотека", hint: "a place with books" },
      { sentence: "Я учусь в ___ классе.", answer: "третьем", hint: "an ordinal number" }
    ]
  },
  {
    id: "reading-prea1-007",
    level: "Pre-A1",
    title: "Погода",
    text: "Сегодня хорошая погода. Светит солнце. Тепло. Я иду гулять.",
    english: "The weather is good today. The sun is shining. It is warm. I am going for a walk.",
    questions: [
      { sentence: "Сегодня ___ погода.", answer: "хорошая", hint: "the quality of the weather" },
      { sentence: "Я иду ___.", answer: "гулять", hint: "what she is going to do outside" }
    ]
  },
  {
    id: "reading-prea1-008",
    level: "Pre-A1",
    title: "Дом",
    text: "Мой дом большой. В доме есть кухня, гостиная и две спальни. Мне нравится мой дом.",
    english: "My house is big. The house has a kitchen, a living room and two bedrooms. I like my house.",
    questions: [
      { sentence: "В доме есть кухня, гостиная и две ___.", answer: "спальни", hint: "rooms for sleeping" },
      { sentence: "Мой дом ___.", answer: "большой", hint: "its size" }
    ]
  },

  // ─── A1 (12 passages) ────────────────────────────────────────────────────────

  {
    id: "reading-a1-001",
    level: "A1",
    title: "Мой день",
    text: "Каждое утро я встаю в семь часов. Сначала я завтракаю: ем кашу и пью чай. Потом иду на работу на метро. Вечером я читаю книгу или смотрю телевизор.",
    english: "Every morning I get up at seven o'clock. First I have breakfast: I eat porridge and drink tea. Then I go to work by metro. In the evening I read a book or watch television.",
    questions: [
      { sentence: "Я встаю в ___ часов.", answer: "семь", hint: "a time" },
      { sentence: "Я иду на работу на ___.", answer: "метро", hint: "a form of transport" },
      { sentence: "Вечером я читаю ___ или смотрю телевизор.", answer: "книгу", hint: "something you read" }
    ]
  },
  {
    id: "reading-a1-002",
    level: "A1",
    title: "В магазине",
    text: "Вчера я ходил в магазин. Я купил хлеб, молоко и яблоки. Продавец был очень вежливый. Я заплатил картой и пошёл домой.",
    english: "Yesterday I went to the shop. I bought bread, milk and apples. The shop assistant was very polite. I paid by card and went home.",
    questions: [
      { sentence: "Я купил хлеб, молоко и ___.", answer: "яблоки", hint: "a fruit" },
      { sentence: "Я заплатил ___ и пошёл домой.", answer: "картой", hint: "not cash" }
    ]
  },
  {
    id: "reading-a1-003",
    level: "A1",
    title: "Знакомство",
    text: "Меня зовут Сергей. Я живу в Санкт-Петербурге. Я работаю инженером. У меня есть жена и маленький сын. Нам нравится гулять в парке по выходным.",
    english: "My name is Sergei. I live in Saint Petersburg. I work as an engineer. I have a wife and a small son. We like to walk in the park at the weekends.",
    questions: [
      { sentence: "Сергей живёт в ___.", answer: "Санкт-Петербурге", hint: "a Russian city" },
      { sentence: "Он работает ___.", answer: "инженером", hint: "his profession" },
      { sentence: "Они любят гулять в ___ по выходным.", answer: "парке", hint: "an outdoor space" }
    ]
  },
  {
    id: "reading-a1-004",
    level: "A1",
    title: "Любимое время года",
    text: "Моё любимое время года — лето. Летом я хожу на пляж и купаюсь в море. Иногда мы с друзьями едем на дачу. Там мы жарим шашлык и играем в волейбол.",
    english: "My favourite season is summer. In summer I go to the beach and swim in the sea. Sometimes my friends and I go to the dacha. There we have a barbecue and play volleyball.",
    english: "My favourite season is summer. In summer I go to the beach and swim in the sea. Sometimes my friends and I go to the dacha. There we have a barbecue and play volleyball.",
    questions: [
      { sentence: "Летом я хожу на ___ и купаюсь в море.", answer: "пляж", hint: "by the sea" },
      { sentence: "На даче они жарят ___ и играют в волейбол.", answer: "шашлык", hint: "grilled meat on skewers" }
    ]
  },
  {
    id: "reading-a1-005",
    level: "A1",
    title: "Утро в кафе",
    text: "Каждое утро Наташа заходит в кафе около дома. Она заказывает капучино и круассан. Она читает новости на телефоне, пока пьёт кофе. Это её любимый ритуал перед работой.",
    english: "Every morning Natasha stops by the café near her home. She orders a cappuccino and a croissant. She reads the news on her phone while drinking her coffee. It is her favourite ritual before work.",
    questions: [
      { sentence: "Наташа заказывает капучино и ___.", answer: "круассан", hint: "a pastry" },
      { sentence: "Она читает новости на ___ пока пьёт кофе.", answer: "телефоне", hint: "a device" }
    ]
  },
  {
    id: "reading-a1-006",
    level: "A1",
    title: "Мой город",
    text: "Я живу в небольшом городе на юге России. В нашем городе есть красивый парк, старый театр и новый торговый центр. Летом здесь очень тепло, а зимой бывает снег. Мне нравится мой город.",
    english: "I live in a small city in the south of Russia. Our city has a beautiful park, an old theatre and a new shopping centre. In summer it is very warm here, and in winter there can be snow. I like my city.",
    questions: [
      { sentence: "В нашем городе есть красивый парк, старый ___ и новый торговый центр.", answer: "театр", hint: "a cultural venue" },
      { sentence: "Летом здесь очень тепло, а зимой бывает ___.", answer: "снег", hint: "winter precipitation" }
    ]
  },
  {
    id: "reading-a1-007",
    level: "A1",
    title: "Рабочая неделя",
    text: "Катя работает в офисе с понедельника по пятницу. Она начинает работу в девять утра и заканчивает в шесть вечера. В обед она ходит в столовую с коллегами. По пятницам она иногда остаётся после работы с друзьями.",
    english: "Katya works in an office from Monday to Friday. She starts work at nine in the morning and finishes at six in the evening. At lunch she goes to the canteen with her colleagues. On Fridays she sometimes stays after work with friends.",
    questions: [
      { sentence: "Катя работает с понедельника по ___.", answer: "пятницу", hint: "the last working day" },
      { sentence: "В обед она ходит в ___ с коллегами.", answer: "столовую", hint: "a place to eat at work" }
    ]
  },
  {
    id: "reading-a1-008",
    level: "A1",
    title: "Поход в музей",
    text: "В воскресенье мы ходили в Эрмитаж. Там очень много картин и скульптур. Нам больше всего понравился зал с египетскими мумиями. Мы провели в музее четыре часа.",
    english: "On Sunday we went to the Hermitage. There are many paintings and sculptures there. We liked the hall with Egyptian mummies most of all. We spent four hours in the museum.",
    questions: [
      { sentence: "Нам больше всего понравился зал с египетскими ___.", answer: "мумиями", hint: "ancient Egyptian exhibits" },
      { sentence: "Мы провели в музее ___ часа.", answer: "четыре", hint: "a number" }
    ]
  },
  {
    id: "reading-a1-009",
    level: "A1",
    title: "Письмо другу",
    text: "Привет, Дима! Как дела? Я сейчас в Москве. Здесь холодно, но красиво. Вчера я был на Красной площади. Завтра иду в театр. Напиши мне! Твой друг, Коля.",
    english: "Hi Dima! How are you? I am in Moscow now. It is cold here, but beautiful. Yesterday I was at Red Square. Tomorrow I am going to the theatre. Write to me! Your friend, Kolya.",
    questions: [
      { sentence: "Вчера Коля был на ___ площади.", answer: "Красной", hint: "a famous Moscow square" },
      { sentence: "Завтра он идёт в ___.", answer: "театр", hint: "a cultural venue" }
    ]
  },
  {
    id: "reading-a1-010",
    level: "A1",
    title: "Домашние животные",
    text: "У Оли есть кошка по имени Мурка. Мурка живёт дома уже пять лет. Она любит спать на диване и играть с мячиком. Оля кормит её два раза в день.",
    english: "Olya has a cat called Murka. Murka has lived at home for five years already. She likes to sleep on the sofa and play with a ball. Olya feeds her twice a day.",
    questions: [
      { sentence: "Мурка живёт дома уже ___ лет.", answer: "пять", hint: "a number" },
      { sentence: "Оля кормит её ___ раза в день.", answer: "два", hint: "a number" }
    ]
  },
  {
    id: "reading-a1-011",
    level: "A1",
    title: "На вокзале",
    text: "Антон стоит на вокзале. Его поезд отходит в пятнадцать тридцать. У него большой чемодан и маленький рюкзак. Он едет к бабушке в Нижний Новгород.",
    english: "Anton is standing at the railway station. His train departs at fifteen thirty. He has a large suitcase and a small backpack. He is travelling to his grandmother in Nizhny Novgorod.",
    questions: [
      { sentence: "Поезд отходит в пятнадцать ___.", answer: "тридцать", hint: "the minutes part of the time" },
      { sentence: "Антон едет к бабушке в Нижний ___.", answer: "Новгород", hint: "a Russian city" }
    ]
  },
  {
    id: "reading-a1-012",
    level: "A1",
    title: "Суббота дома",
    text: "В прошлую субботу Марина осталась дома. Она убрала квартиру и постирала одежду. Потом она приготовила борщ на обед. Вечером к ней пришла подруга, и они смотрели фильм.",
    english: "Last Saturday Marina stayed at home. She cleaned the flat and did the laundry. Then she made borscht for lunch. In the evening her friend came over and they watched a film.",
    questions: [
      { sentence: "Марина приготовила ___ на обед.", answer: "борщ", hint: "a traditional Russian/Ukrainian soup" },
      { sentence: "Вечером к ней пришла ___, и они смотрели фильм.", answer: "подруга", hint: "a female friend" }
    ]
  },

  // ─── A2 (10 passages) ────────────────────────────────────────────────────────

  {
    id: "reading-a2-001",
    level: "A2",
    title: "Поездка в Петербург",
    text: "Прошлым летом я впервые поехала в Санкт-Петербург. Я провела там неделю. Каждый день я ходила в новое место: Эрмитаж, Петергоф, Невский проспект. Вечерами я гуляла по набережной и наблюдала за белыми ночами. Это было незабываемое путешествие.",
    english: "Last summer I went to Saint Petersburg for the first time. I spent a week there. Every day I visited a new place: the Hermitage, Peterhof, Nevsky Prospekt. In the evenings I walked along the embankment and watched the white nights. It was an unforgettable trip.",
    questions: [
      { sentence: "Я провела в Петербурге ___.", answer: "неделю", hint: "a period of time" },
      { sentence: "Вечерами я наблюдала за белыми ___.", answer: "ночами", hint: "a famous Petersburg phenomenon" },
      { sentence: "Это было незабываемое ___.", answer: "путешествие", hint: "a journey or trip" }
    ]
  },
  {
    id: "reading-a2-002",
    level: "A2",
    title: "Новая работа",
    text: "Два месяца назад Дмитрий сменил работу. Раньше он работал в банке, а теперь он программист в маленькой компании. Сначала было сложно, потому что нужно было многому учиться. Сейчас он доволен своим выбором: работа интересная, а коллеги дружелюбные.",
    english: "Two months ago Dmitry changed jobs. He used to work at a bank, and now he is a programmer at a small company. At first it was difficult because there was a lot to learn. Now he is happy with his choice: the work is interesting and his colleagues are friendly.",
    questions: [
      { sentence: "Раньше Дмитрий работал в ___, а теперь он программист.", answer: "банке", hint: "a financial institution" },
      { sentence: "Сейчас он доволен своим ___: работа интересная.", answer: "выбором", hint: "a decision he made" },
      { sentence: "Коллеги у него ___.", answer: "дружелюбные", hint: "how the colleagues behave" }
    ]
  },
  {
    id: "reading-a2-003",
    level: "A2",
    title: "Рецепт блинов",
    text: "Чтобы приготовить блины, нужны мука, яйца, молоко и немного соли. Сначала нужно смешать все ингредиенты до однородного теста. Потом жарить блины на горячей сковороде по две минуты с каждой стороны. Подавать можно со сметаной, вареньем или мёдом.",
    english: "To make pancakes, you need flour, eggs, milk and a little salt. First you need to mix all the ingredients into a smooth batter. Then fry the pancakes in a hot pan for two minutes on each side. They can be served with sour cream, jam or honey.",
    questions: [
      { sentence: "Для блинов нужны мука, яйца, молоко и немного ___.", answer: "соли", hint: "a seasoning" },
      { sentence: "Блины жарят по ___ минуты с каждой стороны.", answer: "две", hint: "a number" },
      { sentence: "Подавать можно со сметаной, вареньем или ___.", answer: "мёдом", hint: "a sweet topping made by bees" }
    ]
  },
  {
    id: "reading-a2-004",
    level: "A2",
    title: "Студенческая жизнь",
    text: "Аня учится на втором курсе университета. Она живёт в общежитии с двумя соседками. Утром у неё лекции, а вечером она занимается в библиотеке. По выходным она ходит в кино или в театр с друзьями. Несмотря на занятость, она говорит, что студенческие годы — лучшее время жизни.",
    english: "Anya is in her second year at university. She lives in a dormitory with two flatmates. In the morning she has lectures, and in the evening she studies in the library. At weekends she goes to the cinema or theatre with friends. Despite being busy, she says that the student years are the best time of life.",
    questions: [
      { sentence: "Аня живёт в ___ с двумя соседками.", answer: "общежитии", hint: "student accommodation" },
      { sentence: "Вечером она занимается в ___.", answer: "библиотеке", hint: "a place with books for studying" },
      { sentence: "Студенческие годы — лучшее ___ жизни.", answer: "время", hint: "a period" }
    ]
  },
  {
    id: "reading-a2-005",
    level: "A2",
    title: "Праздник",
    text: "На прошлой неделе у Вани был день рождения. Родители купили ему новый велосипед. Вечером к нему пришли друзья, и они ели торт и танцевали. Ваня остался очень доволен праздником.",
    english: "Last week it was Vanya's birthday. His parents bought him a new bicycle. In the evening his friends came over, and they ate cake and danced. Vanya was very pleased with the celebration.",
    questions: [
      { sentence: "Родители купили Ване новый ___.", answer: "велосипед", hint: "a vehicle with two wheels" },
      { sentence: "Вечером друзья ели торт и ___.", answer: "танцевали", hint: "what you do to music" }
    ]
  },
  {
    id: "reading-a2-006",
    level: "A2",
    title: "В аптеке",
    text: "Вчера Ирина почувствовала себя плохо: у неё болела голова и было высокое давление. Она пошла в аптеку и попросила у фармацевта таблетки от головной боли. Фармацевт посоветовал ей также купить витамины. Ирина вернулась домой, приняла лекарство и легла отдыхать.",
    english: "Yesterday Irina felt unwell: she had a headache and high blood pressure. She went to the pharmacy and asked the pharmacist for headache tablets. The pharmacist also advised her to buy vitamins. Irina went home, took the medicine and lay down to rest.",
    questions: [
      { sentence: "У Ирины болела ___ и было высокое давление.", answer: "голова", hint: "part of the body" },
      { sentence: "Фармацевт посоветовал ей также купить ___.", answer: "витамины", hint: "supplements for health" },
      { sentence: "Ирина приняла ___ и легла отдыхать.", answer: "лекарство", hint: "a medicine" }
    ]
  },
  {
    id: "reading-a2-007",
    level: "A2",
    title: "Переписка",
    text: "Привет, Оля! Извини, что давно не писала. Я была очень занята на работе. Сейчас мы с мужем переезжаем в новую квартиру в центре города. Нам нравится новый район: рядом есть парк и хорошие рестораны. Приходи к нам в гости, когда устроимся! Обнимаю, Маша.",
    english: "Hi Olya! Sorry I have not written for a long time. I was very busy at work. My husband and I are now moving to a new flat in the city centre. We like the new area: there is a park nearby and good restaurants. Come and visit us when we have settled in! Hugs, Masha.",
    questions: [
      { sentence: "Маша переезжает в новую квартиру в ___ города.", answer: "центре", hint: "the middle of the city" },
      { sentence: "Рядом есть ___ и хорошие рестораны.", answer: "парк", hint: "an outdoor green space" }
    ]
  },
  {
    id: "reading-a2-008",
    level: "A2",
    title: "Хобби",
    text: "Максим увлекается фотографией уже три года. Он снимает природу, улицы города и портреты людей. В прошлом месяце его фотографии были выставлены в местной галерее. Максим мечтает поехать в путешествие по Сибири, чтобы сфотографировать тайгу.",
    english: "Maxim has been interested in photography for three years already. He photographs nature, city streets and portraits of people. Last month his photographs were exhibited in a local gallery. Maxim dreams of travelling across Siberia to photograph the taiga.",
    questions: [
      { sentence: "Максим увлекается фотографией уже ___ года.", answer: "три", hint: "a number" },
      { sentence: "В прошлом месяце его фотографии были выставлены в местной ___.", answer: "галерее", hint: "an art venue" },
      { sentence: "Максим мечтает сфотографировать ___.", answer: "тайгу", hint: "the Siberian forest" }
    ]
  },
  {
    id: "reading-a2-009",
    level: "A2",
    title: "Транспорт в городе",
    text: "В Москве очень развитая система общественного транспорта. Метро работает с пяти утра до часа ночи. Кроме метро, есть автобусы, трамваи и троллейбусы. Многие москвичи предпочитают метро из-за пробок на дорогах. Одна поездка стоит около пятидесяти рублей.",
    english: "Moscow has a very developed public transport system. The metro operates from five in the morning until one at night. Besides the metro, there are buses, trams and trolleybuses. Many Muscovites prefer the metro because of traffic jams. One journey costs around fifty roubles.",
    questions: [
      { sentence: "Метро работает с пяти утра до ___ ночи.", answer: "часа", hint: "a time" },
      { sentence: "Многие москвичи предпочитают метро из-за ___ на дорогах.", answer: "пробок", hint: "a traffic problem" },
      { sentence: "Одна поездка стоит около ___ рублей.", answer: "пятидесяти", hint: "a number" }
    ]
  },
  {
    id: "reading-a2-010",
    level: "A2",
    title: "Русская зима",
    text: "Русская зима известна своими морозами. В Сибири температура иногда опускается до минус сорока градусов. Несмотря на холод, россияне любят зиму: они катаются на лыжах, играют в хоккей и лепят снеговиков. Новый год — самый любимый праздник в России.",
    english: "The Russian winter is known for its frosts. In Siberia the temperature sometimes drops to minus forty degrees. Despite the cold, Russians love winter: they ski, play hockey and build snowmen. New Year is the most beloved holiday in Russia.",
    questions: [
      { sentence: "В Сибири температура иногда опускается до минус ___ градусов.", answer: "сорока", hint: "a number" },
      { sentence: "Россияне катаются на лыжах, играют в хоккей и лепят ___.", answer: "снеговиков", hint: "a winter figure made of snow" },
      { sentence: "___ год — самый любимый праздник в России.", answer: "Новый", hint: "a winter holiday" }
    ]
  },

  // ─── B1 (10 passages) ────────────────────────────────────────────────────────

  {
    id: "reading-b1-001",
    level: "B1",
    title: "Экология и город",
    text: "Экологическая ситуация в крупных российских городах вызывает всё большую озабоченность у специалистов. Выбросы промышленных предприятий и выхлопные газы автомобилей приводят к ухудшению качества воздуха. Власти ряда городов начали вводить ограничения на въезд автомобилей в центр и развивать велосипедную инфраструктуру. Однако многие эксперты считают, что этих мер недостаточно.",
    english: "The ecological situation in major Russian cities is causing increasing concern among specialists. Emissions from industrial enterprises and vehicle exhaust fumes are leading to a deterioration in air quality. The authorities in a number of cities have started introducing restrictions on cars entering the centre and developing cycling infrastructure. However, many experts believe these measures are insufficient.",
    questions: [
      { sentence: "Выбросы предприятий и выхлопные газы приводят к ухудшению качества ___.", answer: "воздуха", hint: "what we breathe" },
      { sentence: "Власти начали развивать ___ инфраструктуру.", answer: "велосипедную", hint: "related to cycling" }
    ]
  },
  {
    id: "reading-b1-002",
    level: "B1",
    title: "Молодёжь и чтение",
    text: "Социологи отмечают, что молодые люди стали читать меньше, чем предыдущие поколения. Многие предпочитают короткие посты в социальных сетях длинным текстам. Тем не менее некоторые исследования показывают, что любители электронных книг читают не меньше, чем поклонники традиционных изданий. Главный вопрос, по мнению педагогов, состоит не в формате, а в качестве читаемого.",
    english: "Sociologists note that young people have started reading less than previous generations. Many prefer short social media posts to long texts. However, some studies show that fans of e-books read no less than lovers of traditional publications. The main question, in the opinion of educators, is not the format but the quality of what is read.",
    questions: [
      { sentence: "Многие молодые люди предпочитают короткие посты длинным ___.", answer: "текстам", hint: "written content" },
      { sentence: "Главный вопрос состоит не в формате, а в ___ читаемого.", answer: "качестве", hint: "how good something is" }
    ]
  },
  {
    id: "reading-b1-003",
    level: "B1",
    title: "Деловое письмо",
    text: "Уважаемый Иван Петрович! Настоящим письмом сообщаем вам, что ваша заявка на участие в конференции была одобрена. Мероприятие состоится двадцать второго ноября в конгресс-центре «Измайлово». Просьба подтвердить своё участие не позднее пятнадцатого числа текущего месяца. С уважением, Оргкомитет.",
    english: "Dear Ivan Petrovich! We hereby inform you that your application to participate in the conference has been approved. The event will take place on the twenty-second of November at the Izmailovo Congress Centre. Please confirm your participation no later than the fifteenth of the current month. Yours sincerely, the Organising Committee.",
    questions: [
      { sentence: "Заявка Ивана Петровича на участие в ___ была одобрена.", answer: "конференции", hint: "a professional event" },
      { sentence: "Мероприятие состоится в конгресс-центре ___.", answer: "«Измайлово»", hint: "the venue name" },
      { sentence: "Просьба подтвердить участие не позднее ___ числа.", answer: "пятнадцатого", hint: "an ordinal number" }
    ]
  },
  {
    id: "reading-b1-004",
    level: "B1",
    title: "Русская литература",
    text: "Русская литература девятнадцатого века занимает особое место в мировой культуре. Произведения Толстого, Достоевского и Чехова переведены на десятки языков и изучаются в университетах по всему миру. Исследователи выделяют в них особый интерес к нравственным вопросам и глубокий психологизм. Для многих иностранцев именно классическая литература становится первым знакомством с русской душой.",
    english: "Russian literature of the nineteenth century occupies a special place in world culture. The works of Tolstoy, Dostoevsky and Chekhov have been translated into dozens of languages and are studied at universities around the world. Researchers identify in them a special interest in moral questions and deep psychologism. For many foreigners, classical literature becomes the first acquaintance with the Russian soul.",
    questions: [
      { sentence: "Произведения Толстого, Достоевского и Чехова переведены на ___ языков.", answer: "десятки", hint: "a large number" },
      { sentence: "Для многих иностранцев литература становится первым знакомством с русской ___.", answer: "душой", hint: "the Russian spirit or soul" }
    ]
  },
  {
    id: "reading-b1-005",
    level: "B1",
    title: "Рынок жилья",
    text: "Цены на аренду жилья в Москве продолжают расти из-за высокого спроса и ограниченного предложения. Многие молодые специалисты, переехавшие в столицу из регионов, вынуждены снимать комнату вместо квартиры или жить далеко от центра. Эксперты рекомендуют тщательно изучать договор аренды, прежде чем подписывать его, чтобы избежать неприятных сюрпризов.",
    english: "Rental prices in Moscow continue to rise due to high demand and limited supply. Many young professionals who have moved to the capital from the regions are forced to rent a room rather than a flat, or to live far from the centre. Experts recommend carefully studying the rental agreement before signing it in order to avoid unpleasant surprises.",
    questions: [
      { sentence: "Цены на аренду растут из-за высокого ___ и ограниченного предложения.", answer: "спроса", hint: "people wanting something" },
      { sentence: "Эксперты рекомендуют тщательно изучать ___ аренды перед подписанием.", answer: "договор", hint: "a legal document" }
    ]
  },
  {
    id: "reading-b1-006",
    level: "B1",
    title: "Кино и современность",
    text: "Российское кино переживает период активного развития. Всё больше отечественных фильмов получают признание на международных кинофестивалях. При этом зрители отмечают, что современное российское кино стало более смелым в выборе тем и менее предсказуемым по сравнению с советскими фильмами. Молодые режиссёры всё чаще обращаются к острым социальным проблемам.",
    english: "Russian cinema is going through a period of active development. More and more domestic films are receiving recognition at international film festivals. At the same time, audiences note that contemporary Russian cinema has become bolder in its choice of themes and less predictable compared to Soviet films. Young directors are increasingly turning to pressing social issues.",
    questions: [
      { sentence: "Российское кино стало более ___ в выборе тем.", answer: "смелым", hint: "daring or courageous" },
      { sentence: "Молодые режиссёры обращаются к острым ___ проблемам.", answer: "социальным", hint: "relating to society" }
    ]
  },
  {
    id: "reading-b1-007",
    level: "B1",
    title: "Здоровый образ жизни",
    text: "В последние годы интерес россиян к здоровому образу жизни заметно вырос. Люди стали больше внимания уделять правильному питанию, регулярным физическим нагрузкам и качеству сна. Фитнес-клубы открываются даже в небольших городах, а продажи органических продуктов питания увеличились на треть за последние пять лет. Специалисты связывают этот тренд с ростом доступности информации о здоровье.",
    english: "In recent years, Russians' interest in a healthy lifestyle has grown noticeably. People have started paying more attention to proper nutrition, regular physical activity and sleep quality. Fitness clubs are opening even in small towns, and sales of organic food have increased by a third over the last five years. Specialists link this trend with the growing availability of health information.",
    questions: [
      { sentence: "Люди стали больше внимания уделять правильному питанию и регулярным физическим ___.", answer: "нагрузкам", hint: "physical exercise" },
      { sentence: "Продажи органических продуктов увеличились на ___ за пять лет.", answer: "треть", hint: "one third" }
    ]
  },
  {
    id: "reading-b1-008",
    level: "B1",
    title: "Путешествие в одиночку",
    text: "Всё больше людей выбирают путешествия в одиночку, и это явление распространяется и в России. Одиночные путешественники отмечают, что такой формат позволяет полностью контролировать маршрут, легче знакомиться с местными жителями и глубже познавать себя. Конечно, есть и сложности: бывает одиноко, а принять важное решение приходится самостоятельно, без чьей-либо поддержки.",
    english: "More and more people are choosing to travel alone, and this phenomenon is spreading in Russia too. Solo travellers note that this format allows complete control over the route, makes it easier to meet local people and helps you get to know yourself better. Of course, there are difficulties too: it can feel lonely, and important decisions have to be made independently, without anyone's support.",
    questions: [
      { sentence: "Одиночные путешествия позволяют легче знакомиться с ___ жителями.", answer: "местными", hint: "people who live there" },
      { sentence: "Принять важное решение приходится ___, без чьей-либо поддержки.", answer: "самостоятельно", hint: "on your own" }
    ]
  },
  {
    id: "reading-b1-009",
    level: "B1",
    title: "Образование онлайн",
    text: "Дистанционное образование в России получило широкое распространение после пандемии. Многие университеты предлагают теперь не только очные, но и онлайн-программы. Студенты ценят возможность учиться в удобном темпе и совмещать учёбу с работой. Однако преподаватели указывают, что дистанционный формат требует от студентов высокого уровня самодисциплины.",
    english: "Distance education in Russia has become widespread after the pandemic. Many universities now offer not only full-time but also online programmes. Students value the opportunity to study at a convenient pace and to combine study with work. However, teachers point out that the remote format requires students to have a high level of self-discipline.",
    questions: [
      { sentence: "Студенты ценят возможность совмещать ___ с работой.", answer: "учёбу", hint: "studying" },
      { sentence: "Дистанционный формат требует от студентов высокого уровня ___.", answer: "самодисциплины", hint: "organising yourself independently" }
    ]
  },
  {
    id: "reading-b1-010",
    level: "B1",
    title: "Гастрономический туризм",
    text: "Гастрономический туризм становится всё более популярным направлением в России. Туристы приезжают в регионы не только ради архитектуры или природы, но и ради местной кухни. На Урале стоит попробовать пельмени ручной лепки, в Карелии — традиционные калитки с картошкой. Знатоки утверждают, что лучший способ понять культуру страны — это попробовать её еду.",
    english: "Gastronomic tourism is becoming an increasingly popular direction in Russia. Tourists come to the regions not only for the architecture or nature, but also for the local cuisine. In the Urals it is worth trying hand-made pelmeni, in Karelia — traditional kalitki with potato. Connoisseurs claim that the best way to understand a country's culture is to try its food.",
    questions: [
      { sentence: "На Урале стоит попробовать ___ ручной лепки.", answer: "пельмени", hint: "a type of Russian dumpling" },
      { sentence: "Лучший способ понять культуру страны — это попробовать её ___.", answer: "еду", hint: "what you eat" }
    ]
  }
];
