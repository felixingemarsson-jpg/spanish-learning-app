/*
 * Curriculum Data — All vocab, verbs, and grammar rules.
 * This is starter content. Full notebook digitization will expand these arrays.
 * The PDFs will be transcribed into these structures.
 */

const DATA = (() => {

  // ── A1 Vocabulary ──
  const vocabA1 = [
    // Hotel
    { id: 'a1-hotel-001', spanish: 'Tengo una reserva', english: 'I have a booking', theme: 'hotel', level: 'A1', context: 'Checking in at reception', chunks: ['tengo', 'una reserva'], grammar_notes: 'tener (yo) + indefinite article + noun' },
    { id: 'a1-hotel-002', spanish: 'Una habitacion doble, por favor', english: 'A double room, please', theme: 'hotel', level: 'A1', context: 'Requesting a room type', chunks: ['habitacion doble', 'por favor'], grammar_notes: 'Indefinite article + noun + adjective' },
    { id: 'a1-hotel-003', spanish: 'Donde esta el ascensor?', english: 'Where is the elevator?', theme: 'hotel', level: 'A1', context: 'Finding your way in a hotel', chunks: ['donde esta', 'el ascensor'], grammar_notes: 'Question word + estar (location)' },
    { id: 'a1-hotel-004', spanish: 'La llave de la habitacion', english: 'The room key', theme: 'hotel', level: 'A1', context: 'Asking for or about your key', chunks: ['la llave', 'de la habitacion'], grammar_notes: 'Definite article + de + definite article (possession)' },
    { id: 'a1-hotel-005', spanish: 'A que hora es el desayuno?', english: 'What time is breakfast?', theme: 'hotel', level: 'A1', context: 'Asking about hotel services', chunks: ['a que hora', 'el desayuno'], grammar_notes: 'Time question + ser' },

    // Food
    { id: 'a1-food-001', spanish: 'La cuenta, por favor', english: 'The bill, please', theme: 'food', level: 'A1', context: 'Asking for the check at a restaurant', chunks: ['la cuenta', 'por favor'], grammar_notes: 'Definite article + noun' },
    { id: 'a1-food-002', spanish: 'Quiero un cafe con leche', english: 'I want a coffee with milk', theme: 'food', level: 'A1', context: 'Ordering at a cafe', chunks: ['quiero', 'cafe con leche'], grammar_notes: 'querer (yo) + indefinite article + noun' },
    { id: 'a1-food-003', spanish: 'Tengo hambre', english: 'I am hungry', theme: 'food', level: 'A1', context: 'Expressing hunger', chunks: ['tengo hambre'], grammar_notes: 'tener + noun (not ser/estar for hunger)' },
    { id: 'a1-food-004', spanish: 'Tengo sed', english: 'I am thirsty', theme: 'food', level: 'A1', context: 'Expressing thirst', chunks: ['tengo sed'], grammar_notes: 'tener + noun (not ser/estar for thirst)' },
    { id: 'a1-food-005', spanish: 'Me gustaria una cerveza', english: 'I would like a beer', theme: 'food', level: 'A1', context: 'Polite ordering', chunks: ['me gustaria', 'una cerveza'], grammar_notes: 'Conditional of gustar + indefinite article + noun' },
    { id: 'a1-food-006', spanish: 'Sin azucar', english: 'Without sugar', theme: 'food', level: 'A1', context: 'Specifying preferences', chunks: ['sin azucar'], grammar_notes: 'sin + noun (no article needed)' },
    { id: 'a1-food-007', spanish: 'Esta muy rico', english: 'It is very tasty', theme: 'food', level: 'A1', context: 'Complimenting food', chunks: ['esta', 'muy rico'], grammar_notes: 'estar (temporary quality) + adverb + adjective' },

    // Drinks
    { id: 'a1-drinks-001', spanish: 'Un vaso de agua', english: 'A glass of water', theme: 'drinks', level: 'A1', context: 'Ordering water', chunks: ['un vaso de', 'agua'], grammar_notes: 'Indefinite article + noun + de + noun' },
    { id: 'a1-drinks-002', spanish: 'Una copa de vino tinto', english: 'A glass of red wine', theme: 'drinks', level: 'A1', context: 'Ordering wine', chunks: ['una copa de', 'vino tinto'], grammar_notes: 'copa (wine glass) vs vaso (water glass)' },
    { id: 'a1-drinks-003', spanish: 'Un zumo de naranja', english: 'An orange juice', theme: 'drinks', level: 'A1', context: 'Ordering juice', chunks: ['zumo de naranja'], grammar_notes: 'zumo = juice (Spain), jugo (Latin America)' },

    // Greetings & basics
    { id: 'a1-basics-001', spanish: 'Buenos dias', english: 'Good morning', theme: 'basics', level: 'A1', context: 'Greeting before noon', chunks: ['buenos dias'], grammar_notes: 'Adjective + noun (plural)' },
    { id: 'a1-basics-002', spanish: 'Buenas tardes', english: 'Good afternoon', theme: 'basics', level: 'A1', context: 'Greeting after noon', chunks: ['buenas tardes'], grammar_notes: 'Feminine because tarde is feminine' },
    { id: 'a1-basics-003', spanish: 'Buenas noches', english: 'Good evening / Good night', theme: 'basics', level: 'A1', context: 'Evening greeting or saying goodbye at night', chunks: ['buenas noches'], grammar_notes: 'Used both as greeting and farewell' },
    { id: 'a1-basics-004', spanish: 'Me llamo...', english: 'My name is...', theme: 'basics', level: 'A1', context: 'Introducing yourself', chunks: ['me llamo'], grammar_notes: 'Reflexive verb llamarse — literally "I call myself"' },
    { id: 'a1-basics-005', spanish: 'Mucho gusto', english: 'Nice to meet you', theme: 'basics', level: 'A1', context: 'After introductions', chunks: ['mucho gusto'], grammar_notes: 'Literally "much pleasure"' },
    { id: 'a1-basics-006', spanish: 'Como estas?', english: 'How are you?', theme: 'basics', level: 'A1', context: 'Informal greeting', chunks: ['como estas'], grammar_notes: 'estar (temporary state) — informal tu form' },
    { id: 'a1-basics-007', spanish: 'Estoy bien, gracias', english: 'I am fine, thanks', theme: 'basics', level: 'A1', context: 'Responding to como estas', chunks: ['estoy bien', 'gracias'], grammar_notes: 'estar (yo) + adjective' },

    // Numbers & time
    { id: 'a1-numbers-001', spanish: 'Que hora es?', english: 'What time is it?', theme: 'numbers', level: 'A1', context: 'Asking the time', chunks: ['que hora es'], grammar_notes: 'ser for telling time' },
    { id: 'a1-numbers-002', spanish: 'Son las tres y media', english: 'It is half past three', theme: 'numbers', level: 'A1', context: 'Telling time', chunks: ['son las tres', 'y media'], grammar_notes: 'son (plural ser) for hours > 1, es la una for 1' },
    { id: 'a1-numbers-003', spanish: 'Cuanto cuesta?', english: 'How much does it cost?', theme: 'numbers', level: 'A1', context: 'Shopping', chunks: ['cuanto cuesta'], grammar_notes: 'costar (o→ue stem change)' },

    // Family
    { id: 'a1-family-001', spanish: 'Tengo dos hermanos', english: 'I have two siblings', theme: 'family', level: 'A1', context: 'Talking about family', chunks: ['tengo', 'dos hermanos'], grammar_notes: 'tener + number + noun' },
    { id: 'a1-family-002', spanish: 'Mi madre es profesora', english: 'My mother is a teacher', theme: 'family', level: 'A1', context: 'Describing family members jobs', chunks: ['mi madre', 'es profesora'], grammar_notes: 'ser for occupation — no article before profession' },
    { id: 'a1-family-003', spanish: 'Mis padres viven en Madrid', english: 'My parents live in Madrid', theme: 'family', level: 'A1', context: 'Talking about where family lives', chunks: ['mis padres', 'viven en'], grammar_notes: 'vivir (ellos) + en + city' },

    // Routines
    { id: 'a1-routines-001', spanish: 'Me levanto a las siete', english: 'I get up at seven', theme: 'routines', level: 'A1', context: 'Daily routine', chunks: ['me levanto', 'a las siete'], grammar_notes: 'Reflexive verb levantarse + a las + hour' },
    { id: 'a1-routines-002', spanish: 'Desayuno a las ocho', english: 'I have breakfast at eight', theme: 'routines', level: 'A1', context: 'Daily routine', chunks: ['desayuno', 'a las ocho'], grammar_notes: 'desayunar (yo) — no reflexive needed' },
    { id: 'a1-routines-003', spanish: 'Trabajo de lunes a viernes', english: 'I work from Monday to Friday', theme: 'routines', level: 'A1', context: 'Work schedule', chunks: ['trabajo', 'de lunes a viernes'], grammar_notes: 'de...a for ranges, days without article' },
    { id: 'a1-routines-004', spanish: 'Me acuesto a las once', english: 'I go to bed at eleven', theme: 'routines', level: 'A1', context: 'Daily routine', chunks: ['me acuesto', 'a las once'], grammar_notes: 'Reflexive verb acostarse (o→ue)' },

    // Directions & location
    { id: 'a1-location-001', spanish: 'Donde esta la estacion?', english: 'Where is the station?', theme: 'location', level: 'A1', context: 'Asking for directions', chunks: ['donde esta', 'la estacion'], grammar_notes: 'estar for location' },
    { id: 'a1-location-002', spanish: 'Esta cerca de aqui', english: 'It is near here', theme: 'location', level: 'A1', context: 'Giving directions', chunks: ['esta cerca', 'de aqui'], grammar_notes: 'estar + adverb of place' },
    { id: 'a1-location-003', spanish: 'A la derecha', english: 'To the right', theme: 'location', level: 'A1', context: 'Giving directions', chunks: ['a la derecha'], grammar_notes: 'a + definite article + noun' },
    { id: 'a1-location-004', spanish: 'Todo recto', english: 'Straight ahead', theme: 'location', level: 'A1', context: 'Giving directions', chunks: ['todo recto'], grammar_notes: 'Fixed expression' },

    // Possessives & questions
    { id: 'a1-questions-001', spanish: 'De donde eres?', english: 'Where are you from?', theme: 'basics', level: 'A1', context: 'Asking about origin', chunks: ['de donde', 'eres'], grammar_notes: 'ser for origin' },
    { id: 'a1-questions-002', spanish: 'Soy de Suecia', english: 'I am from Sweden', theme: 'basics', level: 'A1', context: 'Saying where you are from', chunks: ['soy de', 'Suecia'], grammar_notes: 'ser (yo) + de + country' },
    { id: 'a1-questions-003', spanish: 'Que idiomas hablas?', english: 'What languages do you speak?', theme: 'basics', level: 'A1', context: 'Language conversation', chunks: ['que idiomas', 'hablas'], grammar_notes: 'que + noun + verb (tu)' },
    { id: 'a1-questions-004', spanish: 'Hablo sueco e ingles', english: 'I speak Swedish and English', theme: 'basics', level: 'A1', context: 'Saying what languages you speak', chunks: ['hablo', 'sueco e ingles'], grammar_notes: 'e instead of y before i- words' },
  ];

  // ── A2 Vocabulary ──
  const vocabA2 = [
    { id: 'a2-housing-001', spanish: 'Busco un piso para alquilar', english: 'I am looking for a flat to rent', theme: 'housing', level: 'A2', context: 'Flat hunting', chunks: ['busco', 'un piso', 'para alquilar'], grammar_notes: 'buscar + noun + para + infinitive' },
    { id: 'a2-housing-002', spanish: 'Cuanto es el alquiler al mes?', english: 'How much is the rent per month?', theme: 'housing', level: 'A2', context: 'Asking about rent', chunks: ['cuanto es', 'el alquiler', 'al mes'], grammar_notes: 'al = a + el (contraction)' },
    { id: 'a2-housing-003', spanish: 'El piso tiene dos dormitorios', english: 'The flat has two bedrooms', theme: 'housing', level: 'A2', context: 'Describing an apartment', chunks: ['tiene', 'dos dormitorios'], grammar_notes: 'tener (el/ella)' },
    { id: 'a2-school-001', spanish: 'Tengo clase a las nueve', english: 'I have class at nine', theme: 'school', level: 'A2', context: 'Talking about schedule', chunks: ['tengo clase', 'a las nueve'], grammar_notes: 'tener + noun (no article before class)' },
    { id: 'a2-school-002', spanish: 'Estudio espanol desde hace un ano', english: 'I have been studying Spanish for a year', theme: 'school', level: 'A2', context: 'Duration of study', chunks: ['estudio', 'desde hace', 'un ano'], grammar_notes: 'desde hace + duration = present tense (still ongoing)' },
    { id: 'a2-school-003', spanish: 'No entiendo, puede repetir?', english: "I don't understand, can you repeat?", theme: 'school', level: 'A2', context: 'Classroom language', chunks: ['no entiendo', 'puede repetir'], grammar_notes: 'puede + infinitive (formal usted)' },
    { id: 'a2-health-001', spanish: 'Me duele la cabeza', english: 'I have a headache', theme: 'health', level: 'A2', context: 'Describing pain', chunks: ['me duele', 'la cabeza'], grammar_notes: 'doler works like gustar — indirect object + verb + subject' },
    { id: 'a2-health-002', spanish: 'Necesito ir al medico', english: 'I need to go to the doctor', theme: 'health', level: 'A2', context: 'Seeking medical help', chunks: ['necesito', 'ir al medico'], grammar_notes: 'necesitar + infinitive, al = a + el' },
    { id: 'a2-weather-001', spanish: 'Hoy hace mucho calor', english: 'Today it is very hot', theme: 'weather', level: 'A2', context: 'Talking about weather', chunks: ['hace', 'mucho calor'], grammar_notes: 'hacer for weather — hace calor/frio/viento/sol' },
    { id: 'a2-weather-002', spanish: 'Esta lloviendo', english: 'It is raining', theme: 'weather', level: 'A2', context: 'Current weather', chunks: ['esta lloviendo'], grammar_notes: 'estar + gerund (present progressive)' },
    { id: 'a2-shopping-001', spanish: 'Tiene una talla mas grande?', english: 'Do you have a bigger size?', theme: 'shopping', level: 'A2', context: 'Clothes shopping', chunks: ['tiene', 'una talla', 'mas grande'], grammar_notes: 'mas + adjective = comparative' },
    { id: 'a2-shopping-002', spanish: 'Me lo llevo', english: "I'll take it", theme: 'shopping', level: 'A2', context: 'Deciding to buy', chunks: ['me lo llevo'], grammar_notes: 'Reflexive + direct object pronoun + llevar' },
    { id: 'a2-past-001', spanish: 'Ayer fui al cine', english: 'Yesterday I went to the cinema', theme: 'past', level: 'A2', context: 'Talking about past activities', chunks: ['ayer', 'fui al cine'], grammar_notes: 'ir preterite (yo = fui), al = a + el' },
    { id: 'a2-past-002', spanish: 'El ano pasado viaje a Espana', english: 'Last year I traveled to Spain', theme: 'past', level: 'A2', context: 'Talking about past trips', chunks: ['el ano pasado', 'viaje a'], grammar_notes: 'viajar preterite (yo = viaje) + a + country' },
    { id: 'a2-past-003', spanish: 'Cuando era nino, vivia en el campo', english: 'When I was a child, I lived in the countryside', theme: 'past', level: 'A2', context: 'Describing past habits', chunks: ['cuando era nino', 'vivia en'], grammar_notes: 'Imperfect for background descriptions and habitual past' },
  ];

  // ── Verbs ──
  const verbs = [
    {
      infinitive: 'ser', english: 'to be (permanent)', type: 'irregular',
      usage: 'DOCTOR: Description, Occupation, Characteristic, Time, Origin, Relationship',
      gerund: 'siendo',
      tenses: {
        present: { yo: 'soy', tu: 'eres', el: 'es', nosotros: 'somos', vosotros: 'sois', ellos: 'son' },
        preterite: { yo: 'fui', tu: 'fuiste', el: 'fue', nosotros: 'fuimos', vosotros: 'fuisteis', ellos: 'fueron' },
        imperfect: { yo: 'era', tu: 'eras', el: 'era', nosotros: 'eramos', vosotros: 'erais', ellos: 'eran' },
      },
    },
    {
      infinitive: 'estar', english: 'to be (temporary/location)', type: 'irregular',
      usage: 'PLACE: Position, Location, Action (progressive), Condition, Emotion',
      gerund: 'estando',
      tenses: {
        present: { yo: 'estoy', tu: 'estas', el: 'esta', nosotros: 'estamos', vosotros: 'estais', ellos: 'estan' },
        preterite: { yo: 'estuve', tu: 'estuviste', el: 'estuvo', nosotros: 'estuvimos', vosotros: 'estuvisteis', ellos: 'estuvieron' },
        imperfect: { yo: 'estaba', tu: 'estabas', el: 'estaba', nosotros: 'estabamos', vosotros: 'estabais', ellos: 'estaban' },
      },
    },
    {
      infinitive: 'tener', english: 'to have', type: 'irregular',
      usage: 'Possession, age (tengo 20 anos), expressions (tengo hambre/sed/sueno)',
      gerund: 'teniendo',
      tenses: {
        present: { yo: 'tengo', tu: 'tienes', el: 'tiene', nosotros: 'tenemos', vosotros: 'teneis', ellos: 'tienen' },
        preterite: { yo: 'tuve', tu: 'tuviste', el: 'tuvo', nosotros: 'tuvimos', vosotros: 'tuvisteis', ellos: 'tuvieron' },
        imperfect: { yo: 'tenia', tu: 'tenias', el: 'tenia', nosotros: 'teniamos', vosotros: 'teniais', ellos: 'tenian' },
      },
    },
    {
      infinitive: 'ir', english: 'to go', type: 'irregular',
      usage: 'Movement, future (ir a + infinitive)',
      gerund: 'yendo',
      tenses: {
        present: { yo: 'voy', tu: 'vas', el: 'va', nosotros: 'vamos', vosotros: 'vais', ellos: 'van' },
        preterite: { yo: 'fui', tu: 'fuiste', el: 'fue', nosotros: 'fuimos', vosotros: 'fuisteis', ellos: 'fueron' },
        imperfect: { yo: 'iba', tu: 'ibas', el: 'iba', nosotros: 'ibamos', vosotros: 'ibais', ellos: 'iban' },
      },
    },
    {
      infinitive: 'hacer', english: 'to do / to make', type: 'irregular',
      usage: 'Actions, weather (hace calor), time ago (hace dos anos)',
      gerund: 'haciendo',
      tenses: {
        present: { yo: 'hago', tu: 'haces', el: 'hace', nosotros: 'hacemos', vosotros: 'haceis', ellos: 'hacen' },
        preterite: { yo: 'hice', tu: 'hiciste', el: 'hizo', nosotros: 'hicimos', vosotros: 'hicisteis', ellos: 'hicieron' },
        imperfect: { yo: 'hacia', tu: 'hacias', el: 'hacia', nosotros: 'haciamos', vosotros: 'haciais', ellos: 'hacian' },
      },
    },
    {
      infinitive: 'querer', english: 'to want / to love', type: 'irregular',
      usage: 'Desires, requests (quiero + noun/infinitive), love (te quiero)',
      gerund: 'queriendo',
      tenses: {
        present: { yo: 'quiero', tu: 'quieres', el: 'quiere', nosotros: 'queremos', vosotros: 'quereis', ellos: 'quieren' },
        preterite: { yo: 'quise', tu: 'quisiste', el: 'quiso', nosotros: 'quisimos', vosotros: 'quisisteis', ellos: 'quisieron' },
        imperfect: { yo: 'queria', tu: 'querias', el: 'queria', nosotros: 'queriamos', vosotros: 'queriais', ellos: 'querian' },
      },
    },
    {
      infinitive: 'poder', english: 'can / to be able to', type: 'irregular',
      usage: 'Ability, permission, possibility',
      gerund: 'pudiendo',
      tenses: {
        present: { yo: 'puedo', tu: 'puedes', el: 'puede', nosotros: 'podemos', vosotros: 'podeis', ellos: 'pueden' },
        preterite: { yo: 'pude', tu: 'pudiste', el: 'pudo', nosotros: 'pudimos', vosotros: 'pudisteis', ellos: 'pudieron' },
        imperfect: { yo: 'podia', tu: 'podias', el: 'podia', nosotros: 'podiamos', vosotros: 'podiais', ellos: 'podian' },
      },
    },
    {
      infinitive: 'hablar', english: 'to speak', type: 'regular-ar',
      usage: 'Speaking, talking',
      gerund: 'hablando',
      tenses: {
        present: { yo: 'hablo', tu: 'hablas', el: 'habla', nosotros: 'hablamos', vosotros: 'hablais', ellos: 'hablan' },
        preterite: { yo: 'hable', tu: 'hablaste', el: 'hablo', nosotros: 'hablamos', vosotros: 'hablasteis', ellos: 'hablaron' },
        imperfect: { yo: 'hablaba', tu: 'hablabas', el: 'hablaba', nosotros: 'hablabamos', vosotros: 'hablabais', ellos: 'hablaban' },
      },
    },
    {
      infinitive: 'comer', english: 'to eat', type: 'regular-er',
      usage: 'Eating',
      gerund: 'comiendo',
      tenses: {
        present: { yo: 'como', tu: 'comes', el: 'come', nosotros: 'comemos', vosotros: 'comeis', ellos: 'comen' },
        preterite: { yo: 'comi', tu: 'comiste', el: 'comio', nosotros: 'comimos', vosotros: 'comisteis', ellos: 'comieron' },
        imperfect: { yo: 'comia', tu: 'comias', el: 'comia', nosotros: 'comiamos', vosotros: 'comiais', ellos: 'comian' },
      },
    },
    {
      infinitive: 'vivir', english: 'to live', type: 'regular-ir',
      usage: 'Living, residing',
      gerund: 'viviendo',
      tenses: {
        present: { yo: 'vivo', tu: 'vives', el: 'vive', nosotros: 'vivimos', vosotros: 'vivis', ellos: 'viven' },
        preterite: { yo: 'vivi', tu: 'viviste', el: 'vivio', nosotros: 'vivimos', vosotros: 'vivisteis', ellos: 'vivieron' },
        imperfect: { yo: 'vivia', tu: 'vivias', el: 'vivia', nosotros: 'viviamos', vosotros: 'viviais', ellos: 'vivian' },
      },
    },
    {
      infinitive: 'saber', english: 'to know (facts)', type: 'irregular',
      usage: 'Knowing facts, information, how to do something (saber + infinitive)',
      gerund: 'sabiendo',
      tenses: {
        present: { yo: 'se', tu: 'sabes', el: 'sabe', nosotros: 'sabemos', vosotros: 'sabeis', ellos: 'saben' },
        preterite: { yo: 'supe', tu: 'supiste', el: 'supo', nosotros: 'supimos', vosotros: 'supisteis', ellos: 'supieron' },
        imperfect: { yo: 'sabia', tu: 'sabias', el: 'sabia', nosotros: 'sabiamos', vosotros: 'sabiais', ellos: 'sabian' },
      },
    },
    {
      infinitive: 'decir', english: 'to say / to tell', type: 'irregular',
      usage: 'Saying, telling',
      gerund: 'diciendo',
      tenses: {
        present: { yo: 'digo', tu: 'dices', el: 'dice', nosotros: 'decimos', vosotros: 'decis', ellos: 'dicen' },
        preterite: { yo: 'dije', tu: 'dijiste', el: 'dijo', nosotros: 'dijimos', vosotros: 'dijisteis', ellos: 'dijeron' },
        imperfect: { yo: 'decia', tu: 'decias', el: 'decia', nosotros: 'deciamos', vosotros: 'deciais', ellos: 'decian' },
      },
    },
    {
      infinitive: 'dar', english: 'to give', type: 'irregular',
      usage: 'Giving',
      gerund: 'dando',
      tenses: {
        present: { yo: 'doy', tu: 'das', el: 'da', nosotros: 'damos', vosotros: 'dais', ellos: 'dan' },
        preterite: { yo: 'di', tu: 'diste', el: 'dio', nosotros: 'dimos', vosotros: 'disteis', ellos: 'dieron' },
        imperfect: { yo: 'daba', tu: 'dabas', el: 'daba', nosotros: 'dabamos', vosotros: 'dabais', ellos: 'daban' },
      },
    },
    {
      infinitive: 'poner', english: 'to put / to place', type: 'irregular',
      usage: 'Placing, putting on (clothes)',
      gerund: 'poniendo',
      tenses: {
        present: { yo: 'pongo', tu: 'pones', el: 'pone', nosotros: 'ponemos', vosotros: 'poneis', ellos: 'ponen' },
        preterite: { yo: 'puse', tu: 'pusiste', el: 'puso', nosotros: 'pusimos', vosotros: 'pusisteis', ellos: 'pusieron' },
        imperfect: { yo: 'ponia', tu: 'ponias', el: 'ponia', nosotros: 'poniamos', vosotros: 'poniais', ellos: 'ponian' },
      },
    },
    {
      infinitive: 'salir', english: 'to leave / to go out', type: 'irregular',
      usage: 'Leaving, going out',
      gerund: 'saliendo',
      tenses: {
        present: { yo: 'salgo', tu: 'sales', el: 'sale', nosotros: 'salimos', vosotros: 'salis', ellos: 'salen' },
        preterite: { yo: 'sali', tu: 'saliste', el: 'salio', nosotros: 'salimos', vosotros: 'salisteis', ellos: 'salieron' },
        imperfect: { yo: 'salia', tu: 'salias', el: 'salia', nosotros: 'saliamos', vosotros: 'saliais', ellos: 'salian' },
      },
    },
    {
      infinitive: 'venir', english: 'to come', type: 'irregular',
      usage: 'Coming, arriving',
      gerund: 'viniendo',
      tenses: {
        present: { yo: 'vengo', tu: 'vienes', el: 'viene', nosotros: 'venimos', vosotros: 'venis', ellos: 'vienen' },
        preterite: { yo: 'vine', tu: 'viniste', el: 'vino', nosotros: 'vinimos', vosotros: 'vinisteis', ellos: 'vinieron' },
        imperfect: { yo: 'venia', tu: 'venias', el: 'venia', nosotros: 'veniamos', vosotros: 'veniais', ellos: 'venian' },
      },
    },
    {
      infinitive: 'dormir', english: 'to sleep', type: 'irregular',
      usage: 'Sleeping (o→ue stem change)',
      gerund: 'durmiendo',
      tenses: {
        present: { yo: 'duermo', tu: 'duermes', el: 'duerme', nosotros: 'dormimos', vosotros: 'dormis', ellos: 'duermen' },
        preterite: { yo: 'dormi', tu: 'dormiste', el: 'durmio', nosotros: 'dormimos', vosotros: 'dormisteis', ellos: 'durmieron' },
        imperfect: { yo: 'dormia', tu: 'dormias', el: 'dormia', nosotros: 'dormiamos', vosotros: 'dormiais', ellos: 'dormian' },
      },
    },
    {
      infinitive: 'jugar', english: 'to play', type: 'irregular',
      usage: 'Playing games/sports (u→ue stem change, unique)',
      gerund: 'jugando',
      tenses: {
        present: { yo: 'juego', tu: 'juegas', el: 'juega', nosotros: 'jugamos', vosotros: 'jugais', ellos: 'juegan' },
        preterite: { yo: 'jugue', tu: 'jugaste', el: 'jugo', nosotros: 'jugamos', vosotros: 'jugasteis', ellos: 'jugaron' },
        imperfect: { yo: 'jugaba', tu: 'jugabas', el: 'jugaba', nosotros: 'jugabamos', vosotros: 'jugabais', ellos: 'jugaban' },
      },
    },
    {
      infinitive: 'pensar', english: 'to think', type: 'irregular',
      usage: 'Thinking (e→ie stem change)',
      gerund: 'pensando',
      tenses: {
        present: { yo: 'pienso', tu: 'piensas', el: 'piensa', nosotros: 'pensamos', vosotros: 'pensais', ellos: 'piensan' },
        preterite: { yo: 'pense', tu: 'pensaste', el: 'penso', nosotros: 'pensamos', vosotros: 'pensasteis', ellos: 'pensaron' },
        imperfect: { yo: 'pensaba', tu: 'pensabas', el: 'pensaba', nosotros: 'pensabamos', vosotros: 'pensabais', ellos: 'pensaban' },
      },
    },
    {
      infinitive: 'conocer', english: 'to know (people/places)', type: 'irregular',
      usage: 'Knowing people, being familiar with places (yo conozco)',
      gerund: 'conociendo',
      tenses: {
        present: { yo: 'conozco', tu: 'conoces', el: 'conoce', nosotros: 'conocemos', vosotros: 'conoceis', ellos: 'conocen' },
        preterite: { yo: 'conoci', tu: 'conociste', el: 'conocio', nosotros: 'conocimos', vosotros: 'conocisteis', ellos: 'conocieron' },
        imperfect: { yo: 'conocia', tu: 'conocias', el: 'conocia', nosotros: 'conociamos', vosotros: 'conociais', ellos: 'conocian' },
      },
    },
  ];

  // ── Grammar Rules ──
  const grammarRules = [
    {
      id: 'ser-vs-estar', title: 'Ser vs Estar', level: 'A1',
      rule: 'Ser = DOCTOR (Description, Occupation, Characteristic, Time, Origin, Relationship). Estar = PLACE (Position, Location, Action/progressive, Condition, Emotion).',
      examples: [
        { spanish: 'Soy profesor', english: 'I am a teacher', explanation: 'Occupation → ser' },
        { spanish: 'Estoy cansado', english: 'I am tired', explanation: 'Temporary condition → estar' },
        { spanish: 'Es las tres', english: 'It is three o clock', explanation: 'Time → ser' },
        { spanish: 'Estoy en Madrid', english: 'I am in Madrid', explanation: 'Location → estar' },
      ],
      common_errors: ['Using ser for emotions', 'Using estar for nationality', 'Using ser for location'],
      quiz_items: [
        { sentence: 'Ella ___ profesora', answer: 'es', options: ['es', 'esta'], explanation: 'Occupation → ser' },
        { sentence: 'Yo ___ cansado', answer: 'estoy', options: ['soy', 'estoy'], explanation: 'Temporary state → estar' },
        { sentence: 'Nosotros ___ en la oficina', answer: 'estamos', options: ['somos', 'estamos'], explanation: 'Location → estar' },
        { sentence: 'Ellos ___ de Mexico', answer: 'son', options: ['son', 'estan'], explanation: 'Origin → ser' },
      ],
    },
    {
      id: 'gender-articles', title: 'Gender & Articles', level: 'A1',
      rule: 'Spanish nouns are masculine or feminine. Most nouns ending in -o are masculine (el), most ending in -a are feminine (la). Exceptions: el dia, el mapa, la mano.',
      examples: [
        { spanish: 'El libro', english: 'The book', explanation: '-o ending = masculine' },
        { spanish: 'La mesa', english: 'The table', explanation: '-a ending = feminine' },
        { spanish: 'El dia', english: 'The day', explanation: 'Exception: -a ending but masculine' },
        { spanish: 'La mano', english: 'The hand', explanation: 'Exception: -o ending but feminine' },
      ],
      common_errors: ['Using la with dia', 'Forgetting el/la with professions'],
      quiz_items: [
        { sentence: '___ libro esta en la mesa', answer: 'El', options: ['El', 'La'], explanation: 'libro ends in -o → masculine → el' },
        { sentence: '___ casa es grande', answer: 'La', options: ['El', 'La'], explanation: 'casa ends in -a → feminine → la' },
        { sentence: '___ dia es bonito', answer: 'El', options: ['El', 'La'], explanation: 'dia is masculine (exception)' },
        { sentence: '___ mano esta fria', answer: 'La', options: ['El', 'La'], explanation: 'mano is feminine (exception)' },
      ],
    },
    {
      id: 'preterite-vs-imperfect', title: 'Preterite vs Imperfect', level: 'A2',
      rule: 'Preterite = completed actions with clear beginning/end. Imperfect = ongoing/habitual past, descriptions, background. Key: "What happened?" → preterite. "What was happening?" → imperfect.',
      examples: [
        { spanish: 'Ayer comi paella', english: 'Yesterday I ate paella', explanation: 'Completed action → preterite' },
        { spanish: 'De nino comia mucha fruta', english: 'As a child I used to eat a lot of fruit', explanation: 'Habitual past → imperfect' },
        { spanish: 'Llovia cuando sali de casa', english: 'It was raining when I left the house', explanation: 'Background (imperfect) + interrupting action (preterite)' },
      ],
      common_errors: ['Using preterite for descriptions', 'Using imperfect for completed actions', 'Forgetting imperfect for age/time in the past'],
      quiz_items: [
        { sentence: 'Ayer ___ (ir) al cine', answer: 'fui', options: ['fui', 'iba'], explanation: 'Completed action yesterday → preterite' },
        { sentence: 'Cuando era nino, ___ (jugar) mucho', answer: 'jugaba', options: ['jugue', 'jugaba'], explanation: 'Habitual past action → imperfect' },
        { sentence: '___ (hacer) sol cuando ___ (salir)', answer: 'hacia...sali', options: ['hacia...sali', 'hizo...salia'], explanation: 'Background weather (imperfect) + specific action (preterite)' },
      ],
    },
    {
      id: 'por-vs-para', title: 'Por vs Para', level: 'A2',
      rule: 'Para = purpose, destination, recipient, deadline ("in order to", "for whom"). Por = reason, exchange, duration, movement through ("because of", "in exchange for").',
      examples: [
        { spanish: 'Este regalo es para ti', english: 'This gift is for you', explanation: 'Recipient → para' },
        { spanish: 'Gracias por tu ayuda', english: 'Thanks for your help', explanation: 'Reason/cause → por' },
        { spanish: 'Estudio para aprender', english: 'I study in order to learn', explanation: 'Purpose → para' },
        { spanish: 'Camine por el parque', english: 'I walked through the park', explanation: 'Movement through → por' },
      ],
      common_errors: ['Using para for reasons/causes', 'Using por for destinations'],
      quiz_items: [
        { sentence: 'Este cafe es ___ Maria', answer: 'para', options: ['por', 'para'], explanation: 'Recipient → para' },
        { sentence: 'Gracias ___ venir', answer: 'por', options: ['por', 'para'], explanation: 'Reason → por' },
        { sentence: 'Necesito terminar ___ manana', answer: 'para', options: ['por', 'para'], explanation: 'Deadline → para' },
        { sentence: 'Pase ___ tu casa', answer: 'por', options: ['por', 'para'], explanation: 'Movement through/by → por' },
      ],
    },
    {
      id: 'gustar-pattern', title: 'Gustar & Similar Verbs', level: 'A1',
      rule: 'Gustar literally means "to please." The thing liked is the subject: "Me gusta el cafe" = "Coffee pleases me." Use gusta + singular/infinitive, gustan + plural.',
      examples: [
        { spanish: 'Me gusta el cafe', english: 'I like coffee', explanation: 'Singular noun → gusta' },
        { spanish: 'Me gustan los perros', english: 'I like dogs', explanation: 'Plural noun → gustan' },
        { spanish: 'Te gusta bailar', english: 'You like to dance', explanation: 'Infinitive → gusta' },
        { spanish: 'Nos gusta la musica', english: 'We like music', explanation: 'nos = to us' },
      ],
      common_errors: ['Yo gusto (wrong — should be me gusta)', 'Me gusta los libros (should be gustan)'],
      quiz_items: [
        { sentence: 'Me ___ la musica', answer: 'gusta', options: ['gusta', 'gustan'], explanation: 'la musica is singular → gusta' },
        { sentence: 'Me ___ los gatos', answer: 'gustan', options: ['gusta', 'gustan'], explanation: 'los gatos is plural → gustan' },
        { sentence: '___ gusta el chocolate', answer: 'Me', options: ['Me', 'Yo'], explanation: 'Indirect object pronoun, not subject pronoun' },
        { sentence: 'A Maria le ___ bailar', answer: 'gusta', options: ['gusta', 'gustan'], explanation: 'Infinitive → always gusta (singular)' },
      ],
    },
    {
      id: 'tener-expressions', title: 'Tener Expressions', level: 'A1',
      rule: 'Spanish uses tener (to have) where English uses "to be" for physical states: tengo hambre (I am hungry), tengo frio (I am cold), tengo 20 anos (I am 20 years old).',
      examples: [
        { spanish: 'Tengo hambre', english: 'I am hungry', explanation: 'Literally: I have hunger' },
        { spanish: 'Tengo frio', english: 'I am cold', explanation: 'Literally: I have cold' },
        { spanish: 'Tengo sueno', english: 'I am sleepy', explanation: 'Literally: I have sleep' },
        { spanish: 'Tengo 25 anos', english: 'I am 25 years old', explanation: 'Literally: I have 25 years' },
      ],
      common_errors: ['Soy hambre (wrong verb)', 'Estoy 25 anos (wrong verb for age)'],
      quiz_items: [
        { sentence: '___ hambre', answer: 'Tengo', options: ['Tengo', 'Estoy', 'Soy'], explanation: 'Hunger uses tener, not ser/estar' },
        { sentence: '___ 30 anos', answer: 'Tengo', options: ['Tengo', 'Soy', 'Estoy'], explanation: 'Age uses tener' },
        { sentence: '___ mucho sueno', answer: 'Tengo', options: ['Tengo', 'Estoy', 'Soy'], explanation: 'Sleepiness uses tener' },
      ],
    },
  ];

  // ── Helper functions ──
  function getAllVocab() { return [...vocabA1, ...vocabA2]; }
  function getVocabByLevel(level) { return level === 'A1' ? vocabA1 : vocabA2; }
  function getVocabByTheme(theme) { return getAllVocab().filter(v => v.theme === theme); }
  function getAllThemes() { return [...new Set(getAllVocab().map(v => v.theme))]; }
  function getVocabCard(id) { return getAllVocab().find(v => v.id === id); }

  function getAllVocabIds() { return getAllVocab().map(v => v.id); }
  function getAllVerbCardIds() {
    const ids = [];
    for (const verb of verbs) {
      for (const tense in verb.tenses) {
        for (const pronoun in verb.tenses[tense]) {
          ids.push(`verb-${verb.infinitive}-${tense}-${pronoun}`);
        }
      }
    }
    return ids;
  }
  function getAllGrammarIds() { return grammarRules.map(r => r.id); }

  function getRandomVerb() { return verbs[Math.floor(Math.random() * verbs.length)]; }
  function getRandomTense() { return ['present', 'preterite', 'imperfect'][Math.floor(Math.random() * 3)]; }
  function getRandomPronoun() { return ['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos'][Math.floor(Math.random() * 6)]; }

  const pronounDisplay = {
    yo: 'yo', tu: 'tu', el: 'el/ella/usted',
    nosotros: 'nosotros', vosotros: 'vosotros', ellos: 'ellos/ellas/ustedes'
  };

  const tenseDisplay = { present: 'presente', preterite: 'preterito', imperfect: 'imperfecto' };

  return {
    vocabA1, vocabA2, verbs, grammarRules,
    getAllVocab, getVocabByLevel, getVocabByTheme, getAllThemes, getVocabCard,
    getAllVocabIds, getAllVerbCardIds, getAllGrammarIds,
    getRandomVerb, getRandomTense, getRandomPronoun,
    pronounDisplay, tenseDisplay,
  };
})();
