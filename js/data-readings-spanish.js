const DATA_READINGS = [
  // ─── A1 (12 passages) ───────────────────────────────────────────────────────

  {
    id: "reading-a1-001",
    level: "A1",
    title: "En el hotel",
    text: "María llega al hotel. Tiene una reserva para dos noches. La recepcionista le da la llave de la habitación. La habitación está en el tercer piso.",
    english: "María arrives at the hotel. She has a reservation for two nights. The receptionist gives her the room key. The room is on the third floor.",
    questions: [
      { sentence: "María tiene una reserva para ___ noches.", answer: "dos", hint: "a number" },
      { sentence: "La habitación está en el ___ piso.", answer: "tercer", hint: "an ordinal number" }
    ]
  },
  {
    id: "reading-a1-002",
    level: "A1",
    title: "El desayuno",
    text: "Tomás se levanta a las siete de la mañana. Va a la cocina y prepara el desayuno. Come pan con mantequilla y bebe un café con leche. Después, se ducha y va al trabajo.",
    english: "Tomás gets up at seven in the morning. He goes to the kitchen and makes breakfast. He eats bread with butter and drinks a coffee with milk. Afterwards, he showers and goes to work.",
    questions: [
      { sentence: "Tomás se levanta a las ___ de la mañana.", answer: "siete", hint: "a time" },
      { sentence: "Come pan con ___ y bebe un café.", answer: "mantequilla", hint: "something you spread on bread" },
      { sentence: "Después del desayuno, Tomás va al ___.", answer: "trabajo", hint: "where he spends his day" }
    ]
  },
  {
    id: "reading-a1-003",
    level: "A1",
    title: "La familia de Ana",
    text: "Ana tiene una familia grande. Su padre se llama Carlos y su madre se llama Lucía. Ella tiene dos hermanos: Pedro y Sofía. Todos viven juntos en una casa en Madrid.",
    english: "Ana has a big family. Her father's name is Carlos and her mother's name is Lucía. She has two siblings: Pedro and Sofía. They all live together in a house in Madrid.",
    questions: [
      { sentence: "La familia de Ana vive en una ___ en Madrid.", answer: "casa", hint: "a type of building" },
      { sentence: "Ana tiene ___ hermanos.", answer: "dos", hint: "a number" }
    ]
  },
  {
    id: "reading-a1-004",
    level: "A1",
    title: "En la tienda",
    text: "Luis va a la tienda. Necesita comprar leche, huevos y manzanas. El dependiente le ayuda a encontrar los productos. Luis paga con tarjeta y vuelve a casa.",
    english: "Luis goes to the shop. He needs to buy milk, eggs and apples. The shop assistant helps him find the products. Luis pays by card and returns home.",
    questions: [
      { sentence: "Luis necesita comprar leche, huevos y ___.", answer: "manzanas", hint: "a fruit" },
      { sentence: "Luis paga con ___.", answer: "tarjeta", hint: "not cash" }
    ]
  },
  {
    id: "reading-a1-005",
    level: "A1",
    title: "El tiempo hoy",
    text: "Hoy hace mucho sol en Barcelona. La temperatura es de veinte grados. Carmen lleva una camiseta y unas gafas de sol. Va al parque con su perro.",
    english: "Today it is very sunny in Barcelona. The temperature is twenty degrees. Carmen is wearing a T-shirt and sunglasses. She goes to the park with her dog.",
    questions: [
      { sentence: "La temperatura es de ___ grados.", answer: "veinte", hint: "a number" },
      { sentence: "Carmen va al ___ con su perro.", answer: "parque", hint: "an outdoor space" }
    ]
  },
  {
    id: "reading-a1-006",
    level: "A1",
    title: "Mi clase de español",
    text: "Mi profesora se llama Elena. La clase empieza a las nueve y termina a las diez y media. Hay doce estudiantes en la clase. Estudiamos vocabulario y gramática.",
    english: "My teacher's name is Elena. The class starts at nine and ends at half past ten. There are twelve students in the class. We study vocabulary and grammar.",
    questions: [
      { sentence: "La clase empieza a las ___ y termina a las diez y media.", answer: "nueve", hint: "a time" },
      { sentence: "Hay ___ estudiantes en la clase.", answer: "doce", hint: "a number" }
    ]
  },
  {
    id: "reading-a1-007",
    level: "A1",
    title: "Un café con amigos",
    text: "Pablo y Marta están en un café. Pablo pide un zumo de naranja y una tostada. Marta pide un té con limón. Hablan de sus planes para el fin de semana.",
    english: "Pablo and Marta are in a café. Pablo orders an orange juice and toast. Marta orders a tea with lemon. They talk about their plans for the weekend.",
    questions: [
      { sentence: "Pablo pide un zumo de naranja y una ___.", answer: "tostada", hint: "a food item" },
      { sentence: "Hablan de sus planes para el ___ de semana.", answer: "fin", hint: "the end of something" }
    ]
  },
  {
    id: "reading-a1-008",
    level: "A1",
    title: "El apartamento",
    text: "Mi apartamento es pequeño pero cómodo. Tiene una sala de estar, una cocina, un dormitorio y un baño. La ventana del dormitorio da a la calle. Me gusta mucho mi apartamento.",
    english: "My apartment is small but comfortable. It has a living room, a kitchen, a bedroom and a bathroom. The bedroom window faces the street. I really like my apartment.",
    questions: [
      { sentence: "El apartamento tiene una sala de estar, una cocina, un ___ y un baño.", answer: "dormitorio", hint: "a room for sleeping" },
      { sentence: "La ventana da a la ___.", answer: "calle", hint: "outside the building" }
    ]
  },
  {
    id: "reading-a1-009",
    level: "A1",
    title: "El fin de semana",
    text: "Los sábados, Inés descansa en casa por la mañana. Por la tarde, va al gimnasio con su amiga Rosa. Los domingos, la familia come junta. Es su momento favorito de la semana.",
    english: "On Saturdays, Inés rests at home in the morning. In the afternoon, she goes to the gym with her friend Rosa. On Sundays, the family eats together. It is her favourite moment of the week.",
    questions: [
      { sentence: "Por la tarde, Inés va al ___ con Rosa.", answer: "gimnasio", hint: "a place to exercise" },
      { sentence: "Los domingos, la ___ come junta.", answer: "familia", hint: "the people she lives with" }
    ]
  },
  {
    id: "reading-a1-010",
    level: "A1",
    title: "En el médico",
    text: "Roberto no se siente bien hoy. Tiene fiebre y le duele la cabeza. Va al médico por la mañana. El médico le dice que tiene que descansar y beber mucha agua.",
    english: "Roberto does not feel well today. He has a fever and his head hurts. He goes to the doctor in the morning. The doctor tells him he needs to rest and drink lots of water.",
    questions: [
      { sentence: "Roberto tiene fiebre y le duele la ___.", answer: "cabeza", hint: "part of the body" },
      { sentence: "El médico le dice que tiene que ___ y beber mucha agua.", answer: "descansar", hint: "what you do when you are tired" }
    ]
  },
  {
    id: "reading-a1-011",
    level: "A1",
    title: "Los colores favoritos",
    text: "A Sofía le gusta mucho el color azul. Su habitación es azul y blanca. Lleva ropa de colores claros. Su color favorito para el invierno es el gris.",
    english: "Sofía really likes the colour blue. Her room is blue and white. She wears light-coloured clothes. Her favourite colour for winter is grey.",
    questions: [
      { sentence: "La habitación de Sofía es ___ y blanca.", answer: "azul", hint: "her favourite colour" },
      { sentence: "Su color favorito para el invierno es el ___.", answer: "gris", hint: "a neutral colour" }
    ]
  },
  {
    id: "reading-a1-012",
    level: "A1",
    title: "El transporte",
    text: "Diego vive lejos del trabajo. Cada mañana, toma el metro durante veinte minutos. El metro es rápido y barato. A veces, cuando hace buen tiempo, va en bicicleta.",
    english: "Diego lives far from work. Every morning, he takes the metro for twenty minutes. The metro is fast and cheap. Sometimes, when the weather is good, he goes by bicycle.",
    questions: [
      { sentence: "Diego toma el metro durante ___ minutos.", answer: "veinte", hint: "a number" },
      { sentence: "Cuando hace buen tiempo, va en ___.", answer: "bicicleta", hint: "a vehicle with two wheels" }
    ]
  },

  // ─── A2 (13 passages) ───────────────────────────────────────────────────────

  {
    id: "reading-a2-001",
    level: "A2",
    title: "Las vacaciones de verano",
    text: "El año pasado, mi familia y yo fuimos a la costa. Pasamos dos semanas en un pueblo pequeño cerca del mar. Todos los días nadábamos y comíamos mariscos en los restaurantes del puerto. Fue el mejor verano de mi vida.",
    english: "Last year, my family and I went to the coast. We spent two weeks in a small village near the sea. Every day we swam and ate seafood at the restaurants in the harbour. It was the best summer of my life.",
    questions: [
      { sentence: "Pasamos ___ semanas en el pueblo.", answer: "dos", hint: "a number" },
      { sentence: "Comíamos mariscos en los restaurantes del ___.", answer: "puerto", hint: "where boats are" },
      { sentence: "Fue el mejor ___ de mi vida.", answer: "verano", hint: "a season" }
    ]
  },
  {
    id: "reading-a2-002",
    level: "A2",
    title: "El nuevo trabajo",
    text: "La semana pasada, Lucía empezó un nuevo trabajo en una empresa de tecnología. Sus compañeros son muy simpáticos y la ayudaron mucho el primer día. Trabaja ocho horas al día y le pagan bien. Está muy contenta con su nueva situación.",
    english: "Last week, Lucía started a new job at a technology company. Her colleagues are very friendly and helped her a lot on the first day. She works eight hours a day and is paid well. She is very happy with her new situation.",
    questions: [
      { sentence: "Lucía empezó a trabajar en una empresa de ___.", answer: "tecnología", hint: "the industry sector" },
      { sentence: "Trabaja ___ horas al día.", answer: "ocho", hint: "a number" },
      { sentence: "Está muy ___ con su nueva situación.", answer: "contenta", hint: "her emotional state" }
    ]
  },
  {
    id: "reading-a2-003",
    level: "A2",
    title: "Una carta a la abuela",
    text: "Querida abuela: te escribo desde Buenos Aires. Llegué hace tres días y ya me encanta la ciudad. Ayer visité el barrio de San Telmo y vi un espectáculo de tango en la calle. Pronto te envío más fotos. Un beso, Valentina.",
    english: "Dear grandma: I am writing to you from Buenos Aires. I arrived three days ago and I already love the city. Yesterday I visited the San Telmo neighbourhood and saw a tango show in the street. I will send you more photos soon. A kiss, Valentina.",
    questions: [
      { sentence: "Valentina llegó hace ___ días.", answer: "tres", hint: "a number" },
      { sentence: "Ayer visitó el barrio de San ___.", answer: "Telmo", hint: "a famous neighbourhood" },
      { sentence: "Vio un espectáculo de ___ en la calle.", answer: "tango", hint: "an Argentine dance" }
    ]
  },
  {
    id: "reading-a2-004",
    level: "A2",
    title: "En el mercado",
    text: "Cada sábado, doña Carmen va al mercado del barrio. Compra frutas frescas, verduras de temporada y a veces pollo o pescado. Siempre habla con los vendedores porque los conoce desde hace años. Para ella, ir al mercado es más que hacer la compra.",
    english: "Every Saturday, doña Carmen goes to the neighbourhood market. She buys fresh fruit, seasonal vegetables and sometimes chicken or fish. She always chats with the vendors because she has known them for years. For her, going to the market is more than just shopping.",
    questions: [
      { sentence: "Doña Carmen va al mercado cada ___.", answer: "sábado", hint: "a day of the week" },
      { sentence: "Compra frutas frescas y verduras de ___.", answer: "temporada", hint: "describes products that match the season" },
      { sentence: "Para ella, ir al mercado es más que hacer la ___.", answer: "compra", hint: "what you do at a shop" }
    ]
  },
  {
    id: "reading-a2-005",
    level: "A2",
    title: "El cumpleaños sorpresa",
    text: "El sábado pasado, los amigos de Javier organizaron una fiesta sorpresa para su cumpleaños. Cuando Javier abrió la puerta, todos gritaron '¡Feliz cumpleaños!'. Había globos de colores y una tarta de chocolate. Javier se puso muy rojo pero estaba feliz.",
    english: "Last Saturday, Javier's friends organised a surprise party for his birthday. When Javier opened the door, everyone shouted 'Happy birthday!'. There were colourful balloons and a chocolate cake. Javier went very red but was happy.",
    questions: [
      { sentence: "Cuando Javier abrió la puerta, todos gritaron '¡___ cumpleaños!'.", answer: "Feliz", hint: "a greeting" },
      { sentence: "Había globos de colores y una tarta de ___.", answer: "chocolate", hint: "a flavour" },
      { sentence: "Javier se puso muy ___ pero estaba feliz.", answer: "rojo", hint: "the colour of embarrassment" }
    ]
  },
  {
    id: "reading-a2-006",
    level: "A2",
    title: "El diario de viaje",
    text: "Martes, 14 de mayo. Hoy tomamos un tren de Madrid a Sevilla. El viaje duró casi dos horas y media. Cuando llegamos, fuimos directamente a la Catedral. Es el edificio más impresionante que he visto en mi vida. Mañana visitaremos el Alcázar.",
    english: "Tuesday, 14 May. Today we took a train from Madrid to Seville. The journey lasted almost two and a half hours. When we arrived, we went straight to the Cathedral. It is the most impressive building I have ever seen. Tomorrow we will visit the Alcázar.",
    questions: [
      { sentence: "El viaje de Madrid a Sevilla duró casi dos horas y ___.", answer: "media", hint: "half of something" },
      { sentence: "Cuando llegaron, fueron directamente a la ___.", answer: "Catedral", hint: "a famous monument" },
      { sentence: "Mañana visitarán el ___.", answer: "Alcázar", hint: "another Seville monument" }
    ]
  },
  {
    id: "reading-a2-007",
    level: "A2",
    title: "El piso compartido",
    text: "Desde septiembre, Raquel vive en un piso compartido con tres estudiantes. Al principio fue difícil porque cada uno tenía costumbres distintas. Ahora tienen normas comunes: limpian juntos los fines de semana y cocinan por turnos. La convivencia mejoró mucho.",
    english: "Since September, Raquel has been living in a shared flat with three students. At first it was difficult because each person had different habits. Now they have shared rules: they clean together at weekends and cook in turns. The living situation improved a lot.",
    questions: [
      { sentence: "Raquel vive en un piso compartido desde ___.", answer: "septiembre", hint: "a month" },
      { sentence: "Ahora limpian juntos los fines de semana y cocinan por ___.", answer: "turnos", hint: "taking it in turns" },
      { sentence: "La ___ mejoró mucho.", answer: "convivencia", hint: "living together" }
    ]
  },
  {
    id: "reading-a2-008",
    level: "A2",
    title: "Una receta fácil",
    text: "Para hacer una tortilla española necesitas cuatro huevos, dos patatas medianas, una cebolla y aceite de oliva. Primero, fríe las patatas y la cebolla a fuego lento. Después, mezcla con los huevos batidos y cuaja la tortilla en la sartén. Es un plato sencillo y delicioso.",
    english: "To make a Spanish omelette you need four eggs, two medium potatoes, an onion and olive oil. First, fry the potatoes and onion over a low heat. Then mix with the beaten eggs and set the omelette in the pan. It is a simple and delicious dish.",
    questions: [
      { sentence: "Para la tortilla necesitas cuatro ___, dos patatas y una cebolla.", answer: "huevos", hint: "a key ingredient" },
      { sentence: "Primero, fríe las patatas a fuego ___.", answer: "lento", hint: "the heat level" },
      { sentence: "Es un plato sencillo y ___.", answer: "delicioso", hint: "how it tastes" }
    ]
  },
  {
    id: "reading-a2-009",
    level: "A2",
    title: "El partido de fútbol",
    text: "Ayer, el equipo local jugó contra el campeón de la liga. En la primera parte, el marcador estaba empatado a cero. En el minuto setenta y dos, el delantero marcó un gol impresionante. El estadio entero se levantó para celebrarlo.",
    english: "Yesterday, the local team played against the league champions. In the first half, the scoreboard was level at zero. In the seventy-second minute, the striker scored an impressive goal. The entire stadium stood up to celebrate.",
    questions: [
      { sentence: "En la primera parte, el marcador estaba empatado a ___.", answer: "cero", hint: "a number" },
      { sentence: "En el minuto ___, el delantero marcó un gol.", answer: "setenta y dos", hint: "a minute of the match" },
      { sentence: "El ___ entero se levantó para celebrarlo.", answer: "estadio", hint: "where football is played" }
    ]
  },
  {
    id: "reading-a2-010",
    level: "A2",
    title: "La visita al museo",
    text: "La profesora llevó a la clase al museo de historia natural. Los alumnos vieron esqueletos de dinosaurios y una colección de minerales. Después de la visita, escribieron un pequeño informe sobre lo que aprendieron. A la mayoría le gustó más la sección de los fósiles.",
    english: "The teacher took the class to the natural history museum. The students saw dinosaur skeletons and a mineral collection. After the visit, they wrote a short report on what they had learned. Most of them liked the fossils section best.",
    questions: [
      { sentence: "Los alumnos vieron esqueletos de ___ en el museo.", answer: "dinosaurios", hint: "prehistoric animals" },
      { sentence: "Después de la visita, escribieron un ___ sobre lo que aprendieron.", answer: "informe", hint: "a written document" },
      { sentence: "A la mayoría le gustó más la sección de los ___.", answer: "fósiles", hint: "preserved ancient remains" }
    ]
  },
  {
    id: "reading-a2-011",
    level: "A2",
    title: "El trabajo voluntario",
    text: "Cada mes, un grupo de vecinos se reúne para limpiar el parque del barrio. Recogen basura, pintan los bancos y plantan flores nuevas. El ayuntamiento les proporciona los materiales. Gracias a ellos, el parque está mucho más bonito que antes.",
    english: "Every month, a group of neighbours meets to clean the neighbourhood park. They collect litter, paint the benches and plant new flowers. The town council provides them with materials. Thanks to them, the park is much nicer than before.",
    questions: [
      { sentence: "Recogen basura, pintan los ___ y plantan flores nuevas.", answer: "bancos", hint: "things you sit on in a park" },
      { sentence: "El ___ les proporciona los materiales.", answer: "ayuntamiento", hint: "local government" }
    ]
  },
  {
    id: "reading-a2-012",
    level: "A2",
    title: "Las redes sociales",
    text: "Hoy en día, la mayoría de los jóvenes usa las redes sociales a diario. Suben fotos, comparten vídeos y siguen a personas famosas. Sin embargo, algunos expertos advierten que pasar demasiado tiempo en el móvil puede afectar al sueño y al estado de ánimo.",
    english: "Nowadays, most young people use social media daily. They upload photos, share videos and follow famous people. However, some experts warn that spending too much time on the phone can affect sleep and mood.",
    questions: [
      { sentence: "Los jóvenes suben fotos, comparten vídeos y ___ a personas famosas.", answer: "siguen", hint: "what you do with an account you like" },
      { sentence: "Pasar demasiado tiempo en el móvil puede afectar al ___ y al estado de ánimo.", answer: "sueño", hint: "what you need at night" }
    ]
  },
  {
    id: "reading-a2-013",
    level: "A2",
    title: "Buscando piso",
    text: "Elena está buscando un piso nuevo en Valencia. Ha visitado varios apartamentos esta semana, pero ninguno le ha convencido. Uno era demasiado pequeño y el otro estaba muy lejos del trabajo. Mañana tiene cita para ver uno en el centro que parece prometedor.",
    english: "Elena is looking for a new flat in Valencia. She has visited several apartments this week, but none has convinced her. One was too small and the other was very far from work. Tomorrow she has an appointment to see one in the centre that looks promising.",
    questions: [
      { sentence: "Elena está buscando un piso nuevo en ___.", answer: "Valencia", hint: "a Spanish city" },
      { sentence: "Uno era demasiado ___ y el otro estaba muy lejos del trabajo.", answer: "pequeño", hint: "a size problem" },
      { sentence: "Mañana tiene cita para ver uno en el ___ que parece prometedor.", answer: "centro", hint: "the middle of the city" }
    ]
  },

  // ─── B1 (13 passages) ───────────────────────────────────────────────────────

  {
    id: "reading-b1-001",
    level: "B1",
    title: "El cambio climático",
    text: "Muchos científicos afirman que el cambio climático es el mayor desafío de nuestro tiempo. Las temperaturas han subido más de un grado centígrado en el último siglo, lo que provoca fenómenos meteorológicos extremos. Aunque los gobiernos han firmado acuerdos internacionales, los expertos temen que las medidas actuales no sean suficientes para frenar el calentamiento global.",
    english: "Many scientists claim that climate change is the greatest challenge of our time. Temperatures have risen more than one degree Celsius in the last century, causing extreme weather events. Although governments have signed international agreements, experts fear that current measures may not be enough to halt global warming.",
    questions: [
      { sentence: "Las temperaturas han subido más de un ___ centígrado en el último siglo.", answer: "grado", hint: "a unit of temperature" },
      { sentence: "Los expertos temen que las medidas actuales no sean suficientes para ___ el calentamiento global.", answer: "frenar", hint: "to stop or slow something" }
    ]
  },
  {
    id: "reading-b1-002",
    level: "B1",
    title: "Una mudanza difícil",
    text: "Cuando Andrés llegó a Berlín para estudiar un máster, no imaginaba que adaptarse sería tan complicado. Al principio, le costaba entender el alemán en las tiendas y se sentía solo. Con el tiempo, encontró una comunidad hispanohablante que le ayudó a integrarse. Ahora reconoce que la experiencia le ha hecho crecer como persona.",
    english: "When Andrés arrived in Berlin to study for a master's degree, he did not imagine that adapting would be so complicated. At first, he struggled to understand German in the shops and felt lonely. Over time, he found a Spanish-speaking community that helped him integrate. He now recognises that the experience has helped him grow as a person.",
    questions: [
      { sentence: "Al principio, Andrés se sentía ___ en Berlín.", answer: "solo", hint: "an emotional state" },
      { sentence: "Con el tiempo, encontró una comunidad ___ que le ayudó.", answer: "hispanohablante", hint: "describes people who speak Spanish" },
      { sentence: "La experiencia le ha hecho ___ como persona.", answer: "crecer", hint: "to develop or mature" }
    ]
  },
  {
    id: "reading-b1-003",
    level: "B1",
    title: "El debate sobre el teletrabajo",
    text: "Desde la pandemia, el teletrabajo se ha convertido en una opción habitual para muchos empleados. Sus defensores destacan que permite ahorrar tiempo en desplazamientos y conciliar mejor la vida familiar. Sin embargo, algunos trabajadores echan de menos el contacto social de la oficina y aseguran que les cuesta más separar el trabajo de la vida personal.",
    english: "Since the pandemic, remote working has become a common option for many employees. Its supporters highlight that it saves time on commuting and helps better balance family life. However, some workers miss the social contact of the office and say it is harder for them to separate work from personal life.",
    questions: [
      { sentence: "El teletrabajo permite ahorrar tiempo en ___ y conciliar la vida familiar.", answer: "desplazamientos", hint: "travelling to work" },
      { sentence: "Algunos trabajadores ___ de menos el contacto social de la oficina.", answer: "echan", hint: "they miss something" }
    ]
  },
  {
    id: "reading-b1-004",
    level: "B1",
    title: "La gastronomía como identidad",
    text: "En España, la comida no es solo una necesidad biológica, sino una forma de relacionarse y expresar la identidad regional. Cada comunidad autónoma tiene sus platos tradicionales, y los habitantes los defienden con orgullo. Que alguien diga que la paella no se hace correctamente puede desatar un debate apasionado, sobre todo entre valencianos.",
    english: "In Spain, food is not just a biological necessity, but a way of socialising and expressing regional identity. Every autonomous community has its traditional dishes, and the inhabitants defend them with pride. Someone saying that paella is not made correctly can spark a passionate debate, especially among Valencians.",
    questions: [
      { sentence: "Cada comunidad autónoma tiene sus platos ___ que los habitantes defienden con orgullo.", answer: "tradicionales", hint: "passed down through generations" },
      { sentence: "Decir que la paella no se hace correctamente puede ___ un debate apasionado.", answer: "desatar", hint: "to start or trigger something" }
    ]
  },
  {
    id: "reading-b1-005",
    level: "B1",
    title: "El voluntariado joven",
    text: "Cada vez más jóvenes dedican parte de su tiempo libre a proyectos de voluntariado. Algunos colaboran con organizaciones medioambientales, mientras que otros prefieren trabajar directamente con personas en situación de vulnerabilidad. Los expertos subrayan que el voluntariado no solo beneficia a los demás, sino que también desarrolla habilidades personales y profesionales en quien lo practica.",
    english: "More and more young people are devoting part of their free time to volunteering projects. Some collaborate with environmental organisations, while others prefer to work directly with people in vulnerable situations. Experts stress that volunteering not only benefits others, but also develops personal and professional skills in those who do it.",
    questions: [
      { sentence: "Algunos jóvenes colaboran con organizaciones ___, mientras otros trabajan con personas vulnerables.", answer: "medioambientales", hint: "related to nature and the environment" },
      { sentence: "El voluntariado también desarrolla ___ personales y profesionales.", answer: "habilidades", hint: "skills or abilities" }
    ]
  },
  {
    id: "reading-b1-006",
    level: "B1",
    title: "Un correo profesional",
    text: "Estimado señor Morales: me pongo en contacto con usted para solicitar información sobre el puesto de coordinador publicado en su página web. Adjunto mi currículum vitae y una carta de motivación. Estaría encantada de concertar una entrevista en la fecha que más le convenga. Quedo a su disposición. Atentamente, Nuria Sanz.",
    english: "Dear Mr Morales: I am writing to request information about the coordinator position advertised on your website. I am attaching my CV and a cover letter. I would be delighted to arrange an interview at a time convenient for you. I remain at your disposal. Yours sincerely, Nuria Sanz.",
    questions: [
      { sentence: "Nuria escribe para solicitar información sobre un ___ de coordinador.", answer: "puesto", hint: "a job position" },
      { sentence: "Adjunta su currículum vitae y una carta de ___.", answer: "motivación", hint: "explains why she wants the job" },
      { sentence: "Estaría encantada de concertar una ___.", answer: "entrevista", hint: "a formal meeting" }
    ]
  },
  {
    id: "reading-b1-007",
    level: "B1",
    title: "La música y las emociones",
    text: "Varios estudios han demostrado que escuchar música activa regiones del cerebro relacionadas con el placer y las emociones. Esto explica por qué ciertas canciones nos recuerdan momentos concretos de nuestra vida o nos hacen sentir nostálgicos. Algunos terapeutas utilizan la música como herramienta para tratar la ansiedad y la depresión con resultados prometedores.",
    english: "Several studies have shown that listening to music activates regions of the brain related to pleasure and emotions. This explains why certain songs remind us of specific moments in our life or make us feel nostalgic. Some therapists use music as a tool to treat anxiety and depression with promising results.",
    questions: [
      { sentence: "Escuchar música activa regiones del cerebro relacionadas con el placer y las ___.", answer: "emociones", hint: "feelings" },
      { sentence: "Algunos terapeutas utilizan la música para tratar la ansiedad y la ___ con resultados prometedores.", answer: "depresión", hint: "a mental health condition" }
    ]
  },
  {
    id: "reading-b1-008",
    level: "B1",
    title: "La ciudad de noche",
    text: "A medida que cae la noche, Madrid se transforma en otra ciudad. Los bares y terrazas se llenan de gente que charla animadamente. Las calles del centro, que durante el día están repletas de turistas, cobran un aire más íntimo y local. Para muchos madrileños, la noche es el momento del día en que la ciudad se convierte realmente en suya.",
    english: "As night falls, Madrid transforms into a different city. The bars and terraces fill with people chatting animatedly. The streets of the centre, which during the day are packed with tourists, take on a more intimate and local feel. For many people from Madrid, night-time is the moment of the day when the city truly becomes theirs.",
    questions: [
      { sentence: "Las calles del centro están repletas de ___ durante el día.", answer: "turistas", hint: "visitors from other places" },
      { sentence: "De noche, las calles cobran un aire más ___ y local.", answer: "íntimo", hint: "close and personal" }
    ]
  },
  {
    id: "reading-b1-009",
    level: "B1",
    title: "El aprendizaje de idiomas",
    text: "Los lingüistas coinciden en que la mejor forma de aprender un idioma es usarlo en situaciones reales. Estudiar gramática es útil, pero no es suficiente si no se practica la conversación. Vivir en el país donde se habla la lengua sigue siendo el método más eficaz, aunque hoy en día las aplicaciones y los intercambios en línea ofrecen alternativas accesibles.",
    english: "Linguists agree that the best way to learn a language is to use it in real situations. Studying grammar is useful, but is not enough if conversation is not practised. Living in the country where the language is spoken remains the most effective method, although nowadays apps and online exchanges offer accessible alternatives.",
    questions: [
      { sentence: "Estudiar gramática es útil, pero no es suficiente si no se practica la ___.", answer: "conversación", hint: "speaking with others" },
      { sentence: "Vivir en el país donde se habla la lengua sigue siendo el método más ___.", answer: "eficaz", hint: "working well, effective" }
    ]
  },
  {
    id: "reading-b1-010",
    level: "B1",
    title: "Un accidente pequeño",
    text: "La mañana del martes, Héctor estaba bajando las escaleras cuando tropezó con la mochila de su hijo y cayó. Aunque no fue nada grave, se torció el tobillo y tuvo que guardar reposo durante dos días. Su jefa le pidió que avisara con tiempo si necesitaba más días de baja. Héctor agradece que su familia lo haya cuidado tan bien.",
    english: "On Tuesday morning, Héctor was going down the stairs when he tripped on his son's backpack and fell. Although it was nothing serious, he sprained his ankle and had to rest for two days. His boss asked him to let her know in advance if he needed more sick leave. Héctor is grateful that his family has looked after him so well.",
    questions: [
      { sentence: "Héctor tropezó con la ___ de su hijo y cayó.", answer: "mochila", hint: "a bag used for school" },
      { sentence: "Se torció el ___ y tuvo que guardar reposo.", answer: "tobillo", hint: "part of the leg/foot" },
      { sentence: "Su jefa le pidió que ___ con tiempo si necesitaba más días de baja.", answer: "avisara", hint: "to notify or warn" }
    ]
  },
  {
    id: "reading-b1-011",
    level: "B1",
    title: "La biblioteca pública",
    text: "La biblioteca del barrio acaba de renovar sus instalaciones. Ahora cuenta con una sala de estudio silenciosa, una zona de trabajo en grupo y un rincón de lectura para niños. El director espera que el nuevo espacio anime a más vecinos a hacer uso de los recursos que ofrece. La entrada es gratuita y el horario se ha ampliado hasta las diez de la noche.",
    english: "The neighbourhood library has just renovated its facilities. It now has a quiet study room, a group work area and a reading corner for children. The director hopes that the new space will encourage more residents to make use of the resources on offer. Entry is free and the opening hours have been extended until ten at night.",
    questions: [
      { sentence: "La biblioteca ahora tiene una sala de estudio silenciosa y una zona de trabajo en ___.", answer: "grupo", hint: "working together" },
      { sentence: "El director espera que el nuevo espacio ___ a más vecinos a usar los recursos.", answer: "anime", hint: "to encourage or motivate" },
      { sentence: "La ___ es gratuita y el horario se ha ampliado.", answer: "entrada", hint: "getting in" }
    ]
  },
  {
    id: "reading-b1-012",
    level: "B1",
    title: "Un viaje en tren",
    text: "Siempre que puedo, prefiero viajar en tren antes que en avión. Los trenes te permiten ver el paisaje, moverte por los vagones y llegar directamente al centro de la ciudad. Además, su huella de carbono es considerablemente menor. Si los billetes no fueran tan caros en algunos países, estoy convencido de que mucha más gente los elegiría.",
    english: "Whenever I can, I prefer to travel by train rather than by plane. Trains let you see the landscape, move between carriages and arrive right in the city centre. Furthermore, their carbon footprint is considerably smaller. If tickets were not so expensive in some countries, I am convinced that many more people would choose them.",
    questions: [
      { sentence: "Los trenes permiten ver el ___ y llegar al centro de la ciudad.", answer: "paisaje", hint: "the view through the window" },
      { sentence: "La huella de ___ del tren es considerablemente menor que la del avión.", answer: "carbono", hint: "related to emissions" }
    ]
  },
  {
    id: "reading-b1-013",
    level: "B1",
    title: "La cultura del tapeo",
    text: "En muchas ciudades españolas, salir de tapas es todo un ritual social. Los grupos de amigos o familiares recorren varios bares, tomando una bebida y una pequeña ración en cada uno. No se trata solo de comer, sino de pasear, conversar y disfrutar del ambiente. Esta tradición refleja una forma de entender la vida que valora las relaciones por encima del consumo.",
    english: "In many Spanish cities, going out for tapas is a full social ritual. Groups of friends or family members visit several bars, having a drink and a small portion at each one. It is not just about eating, but about strolling, chatting and enjoying the atmosphere. This tradition reflects a way of understanding life that values relationships above consumption.",
    questions: [
      { sentence: "Los grupos recorren varios bares, tomando una bebida y una pequeña ___ en cada uno.", answer: "ración", hint: "a small serving of food" },
      { sentence: "Esta tradición refleja una forma de entender la vida que valora las ___ por encima del consumo.", answer: "relaciones", hint: "connections between people" }
    ]
  },

  // ─── B2 (12 passages) ───────────────────────────────────────────────────────

  {
    id: "reading-b2-001",
    level: "B2",
    title: "La inteligencia artificial en el trabajo",
    text: "La irrupción de la inteligencia artificial en el mercado laboral ha generado un debate encendido entre economistas y sociólogos. Mientras algunos sostienen que la automatización destruirá millones de empleos rutinarios, otros argumentan que creará nuevas profesiones aún no imaginadas. Lo que parece indiscutible es que quienes no adquieran competencias digitales quedarán en una posición de desventaja frente a quienes sí lo hagan.",
    english: "The arrival of artificial intelligence in the labour market has sparked a heated debate among economists and sociologists. While some maintain that automation will destroy millions of routine jobs, others argue that it will create new professions not yet imagined. What seems indisputable is that those who do not acquire digital skills will be at a disadvantage compared to those who do.",
    questions: [
      { sentence: "Algunos economistas sostienen que la ___ destruirá millones de empleos rutinarios.", answer: "automatización", hint: "machines taking over tasks" },
      { sentence: "Quienes no adquieran competencias ___ quedarán en una posición de desventaja.", answer: "digitales", hint: "related to technology" }
    ]
  },
  {
    id: "reading-b2-002",
    level: "B2",
    title: "El periodismo en la era digital",
    text: "La proliferación de medios digitales ha transformado radicalmente el oficio periodístico. La inmediatez que exige el entorno en línea obliga a los redactores a publicar antes de verificar, lo que ha incrementado la difusión de noticias falsas. Paradójicamente, en un mundo saturado de información, la capacidad de discernir fuentes fiables se ha convertido en una de las habilidades más valiosas del ciudadano contemporáneo.",
    english: "The proliferation of digital media has radically transformed the journalistic profession. The immediacy demanded by the online environment forces journalists to publish before verifying, which has increased the spread of fake news. Paradoxically, in a world saturated with information, the ability to discern reliable sources has become one of the most valuable skills of the contemporary citizen.",
    questions: [
      { sentence: "La ___ que exige el entorno en línea obliga a los redactores a publicar antes de verificar.", answer: "inmediatez", hint: "the need for speed" },
      { sentence: "La capacidad de ___ fuentes fiables se ha convertido en una habilidad muy valiosa.", answer: "discernir", hint: "to distinguish or judge" }
    ]
  },
  {
    id: "reading-b2-003",
    level: "B2",
    title: "La memoria histórica",
    text: "El debate sobre la memoria histórica sigue siendo uno de los más sensibles en la sociedad española. Durante décadas, el pacto de silencio que acompañó la Transición dificultó el reconocimiento público de las víctimas del franquismo. Hoy, quienes abogan por recuperar esa memoria consideran que sin verdad y reparación no puede haber una reconciliación genuina, mientras que otros advierten del riesgo de reabrir heridas del pasado.",
    english: "The debate over historical memory remains one of the most sensitive in Spanish society. For decades, the pact of silence that accompanied the Transition made it difficult to publicly recognise the victims of Francoism. Today, those who advocate recovering that memory consider that without truth and reparation there can be no genuine reconciliation, while others warn of the risk of reopening wounds of the past.",
    questions: [
      { sentence: "El ___ de silencio que acompañó la Transición dificultó el reconocimiento de las víctimas.", answer: "pacto", hint: "an agreement" },
      { sentence: "Quienes abogan por recuperar esa memoria consideran que sin ___ y reparación no puede haber reconciliación.", answer: "verdad", hint: "the opposite of falsehood" }
    ]
  },
  {
    id: "reading-b2-004",
    level: "B2",
    title: "El turismo masivo",
    text: "El fenómeno del turismo masivo ha suscitado una creciente resistencia entre los residentes de ciudades como Venecia, Barcelona o Dubrovnik. La tensión entre los beneficios económicos que generan los visitantes y el deterioro de la calidad de vida de los habitantes es cada vez más difícil de gestionar. Algunos municipios han empezado a imponer tasas turísticas y a limitar la apertura de nuevos alojamientos vacacionales para frenar la llamada turistificación.",
    english: "The phenomenon of mass tourism has provoked growing resistance among residents of cities such as Venice, Barcelona and Dubrovnik. The tension between the economic benefits generated by visitors and the deterioration of residents' quality of life is becoming increasingly difficult to manage. Some local governments have started imposing tourist taxes and limiting the opening of new holiday accommodation to curb what is known as touristification.",
    questions: [
      { sentence: "La tensión entre los beneficios económicos y el ___ de la calidad de vida es difícil de gestionar.", answer: "deterioro", hint: "a decline or worsening" },
      { sentence: "Algunos municipios han empezado a imponer ___ turísticas.", answer: "tasas", hint: "fees or charges" }
    ]
  },
  {
    id: "reading-b2-005",
    level: "B2",
    title: "La paradoja de la elección",
    text: "El psicólogo Barry Schwartz argumenta en su obra que la abundancia de opciones, lejos de hacernos más libres, nos genera mayor ansiedad e insatisfacción. Cuando las alternativas son numerosas, tendemos a rumiar las opciones descartadas y a atribuirnos la culpa si el resultado no es el esperado. Esta paradoja resulta especialmente llamativa en sociedades de consumo donde la variedad se presenta como sinónimo de bienestar.",
    english: "Psychologist Barry Schwartz argues in his work that an abundance of options, far from making us freer, generates greater anxiety and dissatisfaction. When alternatives are numerous, we tend to ruminate over discarded options and blame ourselves if the outcome is not what was expected. This paradox is particularly striking in consumer societies where variety is presented as synonymous with well-being.",
    questions: [
      { sentence: "La abundancia de opciones, lejos de hacernos más libres, nos genera mayor ansiedad e ___.", answer: "insatisfacción", hint: "the opposite of satisfaction" },
      { sentence: "Tendemos a ___ la culpa si el resultado no es el esperado.", answer: "atribuirnos", hint: "to assign blame to oneself" }
    ]
  },
  {
    id: "reading-b2-006",
    level: "B2",
    title: "Carta al director",
    text: "Señor director: me dirijo a usted para expresar mi malestar ante la reciente decisión del ayuntamiento de suprimir el servicio de autobús nocturno en nuestra localidad. Dicha medida perjudica especialmente a los trabajadores del sector de hostelería, cuyos turnos finalizan pasada la medianoche. Le ruego que traslade esta queja a las instancias competentes y que se reconsidere una decisión que juzgamos precipitada e injusta.",
    english: "Dear editor: I am writing to express my displeasure at the recent decision by the town council to cut the night bus service in our town. This measure particularly affects workers in the hospitality sector, whose shifts end after midnight. I urge you to pass this complaint on to the relevant authorities and to reconsider a decision that we consider hasty and unjust.",
    questions: [
      { sentence: "La medida perjudica a los trabajadores de ___ cuyos turnos finalizan pasada la medianoche.", answer: "hostelería", hint: "restaurants, bars and hotels" },
      { sentence: "Le ruego que ___ esta queja a las instancias competentes.", answer: "traslade", hint: "to pass something on" }
    ]
  },
  {
    id: "reading-b2-007",
    level: "B2",
    title: "La arquitectura sostenible",
    text: "Los edificios de nueva construcción ya no pueden permitirse ignorar su impacto medioambiental. La arquitectura sostenible integra materiales de bajo impacto, sistemas de captación solar y estrategias de ventilación natural que reducen drásticamente el consumo energético. Aunque la inversión inicial suele ser mayor, los estudios demuestran que el ahorro acumulado a lo largo de la vida útil del edificio compensa con creces el desembolso inicial.",
    english: "Newly constructed buildings can no longer afford to ignore their environmental impact. Sustainable architecture integrates low-impact materials, solar capture systems and natural ventilation strategies that drastically reduce energy consumption. Although the initial investment is usually higher, studies show that the accumulated savings over the building's lifetime more than offset the initial outlay.",
    questions: [
      { sentence: "La arquitectura sostenible reduce drásticamente el ___ energético.", answer: "consumo", hint: "using up a resource" },
      { sentence: "El ahorro acumulado ___ con creces el desembolso inicial.", answer: "compensa", hint: "makes up for something" }
    ]
  },
  {
    id: "reading-b2-008",
    level: "B2",
    title: "La traducción literaria",
    text: "Traducir literatura es una tarea que va mucho más allá de la mera sustitución de palabras. El traductor debe trasladar no solo el significado, sino también el ritmo, el registro y la carga cultural del texto original. En ocasiones, esto exige tomar decisiones arriesgadas que se alejan de la literalidad en busca de un equivalente funcional. Los mejores traductores son, en cierto sentido, coautores invisibles de las obras que recrean.",
    english: "Translating literature is a task that goes far beyond the mere substitution of words. The translator must convey not only the meaning, but also the rhythm, register and cultural weight of the original text. At times, this requires taking risky decisions that depart from literal accuracy in search of a functional equivalent. The best translators are, in a sense, invisible co-authors of the works they recreate.",
    questions: [
      { sentence: "El traductor debe trasladar el significado, el ritmo, el registro y la ___ cultural del texto.", answer: "carga", hint: "the weight or burden of something" },
      { sentence: "Los mejores traductores son ___ invisibles de las obras que recrean.", answer: "coautores", hint: "they write it together with the original author" }
    ]
  },
  {
    id: "reading-b2-009",
    level: "B2",
    title: "El bienestar animal",
    text: "La preocupación por el bienestar animal ha ganado terreno en el debate público de las últimas décadas. Varios países europeos han endurecido su legislación para prohibir prácticas consideradas crueles en la ganadería intensiva. Sin embargo, los cambios normativos generan resistencia en el sector primario, que alega que los costes adicionales suponen una competencia desleal frente a países con normativas menos estrictas.",
    english: "Concern for animal welfare has gained ground in public debate over recent decades. Several European countries have tightened their legislation to ban practices considered cruel in intensive farming. However, the regulatory changes face resistance from the agricultural sector, which claims that the additional costs create unfair competition against countries with less strict regulations.",
    questions: [
      { sentence: "Varios países europeos han ___ su legislación para prohibir prácticas crueles en la ganadería.", answer: "endurecido", hint: "made stricter" },
      { sentence: "El sector primario alega que los costes adicionales suponen una competencia ___ frente a otros países.", answer: "desleal", hint: "not playing by the same rules" }
    ]
  },
  {
    id: "reading-b2-010",
    level: "B2",
    title: "La gentrificación",
    text: "La gentrificación transforma barrios populares en zonas de alto poder adquisitivo, desplazando a los vecinos de toda la vida a las periferias. El proceso suele comenzar cuando artistas y estudiantes se instalan atraídos por los alquileres bajos, lo que aumenta el atractivo del barrio y acaba por disparar los precios. Los urbanistas debaten si es posible revitalizar un barrio sin sacrificar su tejido social original.",
    english: "Gentrification transforms working-class neighbourhoods into high-purchasing-power areas, displacing long-standing residents to the outskirts. The process usually begins when artists and students move in attracted by low rents, which increases the appeal of the neighbourhood and ends up driving prices up. Urban planners debate whether it is possible to revitalise a neighbourhood without sacrificing its original social fabric.",
    questions: [
      { sentence: "La gentrificación desplaza a los vecinos de toda la vida a las ___.", answer: "periferias", hint: "the outskirts of a city" },
      { sentence: "Los urbanistas debaten si es posible revitalizar un barrio sin sacrificar su ___ social original.", answer: "tejido", hint: "the fabric or network of a community" }
    ]
  },
  {
    id: "reading-b2-011",
    level: "B2",
    title: "La brecha generacional digital",
    text: "Aunque se da por sentado que los jóvenes dominan la tecnología, los investigadores advierten que conviene matizar esta idea. Muchos adolescentes son consumidores pasivos de contenido sin saber evaluar críticamente la información que reciben. Al mismo tiempo, personas mayores que aprendieron tarde a usar internet desarrollan a menudo un uso más reflexivo y selectivo. La competencia digital auténtica va más allá de saber manejar un dispositivo.",
    english: "Although it is taken for granted that young people master technology, researchers warn that this idea should be nuanced. Many teenagers are passive content consumers without knowing how to critically evaluate the information they receive. At the same time, older people who learned to use the internet late often develop a more reflective and selective use. Genuine digital competence goes beyond knowing how to operate a device.",
    questions: [
      { sentence: "Muchos adolescentes son consumidores ___ de contenido sin saber evaluar la información críticamente.", answer: "pasivos", hint: "they receive but do not engage critically" },
      { sentence: "La competencia digital auténtica va más allá de saber ___ un dispositivo.", answer: "manejar", hint: "to operate or handle" }
    ]
  },
  {
    id: "reading-b2-012",
    level: "B2",
    title: "La soledad en las ciudades",
    text: "Paradójicamente, las grandes urbes concentran a millones de personas y al mismo tiempo constituyen el entorno donde la soledad no deseada se experimenta con mayor intensidad. La vida urbana, con su ritmo vertiginoso y sus interacciones superficiales, dificulta la construcción de vínculos profundos. Algunos sociólogos hablan ya de una epidemia silenciosa de soledad cuyas consecuencias para la salud física y mental son comparables a las del tabaquismo crónico.",
    english: "Paradoxically, large cities concentrate millions of people while simultaneously being the environment where unwanted loneliness is experienced most intensely. Urban life, with its dizzying pace and superficial interactions, makes it difficult to build deep bonds. Some sociologists already speak of a silent epidemic of loneliness whose consequences for physical and mental health are comparable to those of chronic smoking.",
    questions: [
      { sentence: "La vida urbana dificulta la construcción de ___ profundos.", answer: "vínculos", hint: "bonds or ties between people" },
      { sentence: "Algunos sociólogos hablan de una epidemia silenciosa de ___ con graves consecuencias para la salud.", answer: "soledad", hint: "the main topic of the passage" }
    ]
  }
];
