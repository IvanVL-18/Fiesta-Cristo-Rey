/*
 * Programa de la Fiesta Patronal 2026 en honor a Cristo Rey, Jagüey de Téllez.
 *
 * Todo lo que se ve en la página sale de aquí. Para corregir algo, cambia el texto y guarda.
 * Las horas `inicio` y `fin` son para que la página diga sola qué está pasando ahorita
 * (formato: año-mes-díaThora:minutos con la zona horaria de México, -06:00).
 */
window.FIESTA = {
  // Frases del listón que corre arriba del programa.
  liston: [
    'Viernes 20: inauguración con mariachi y baile sonidero',
    'Sábado 21: cabalgata, rodeo infantil, fútbol y rodeo-baile',
    'Domingo 22: caravana trokera, misa, básquetbol y danza',
    'Domingo 8:30 p.m.: Marco Flores y la Banda Jerez'
  ],

  // Link de Google Maps de la Explanada Principal (cuando lo tengas, pégalo aquí).
  mapaExplanada: '',

  dias: [
    { id: 'viernes', corto: 'Viernes 20', nombre: 'Viernes 20 de noviembre', fecha: '2026-11-20' },
    { id: 'sabado', corto: 'Sábado 21', nombre: 'Sábado 21 de noviembre', fecha: '2026-11-21' },
    { id: 'domingo', corto: 'Domingo 22', nombre: 'Domingo 22 de noviembre', fecha: '2026-11-22' }
  ],

  eventos: [
    {
      id: 'inauguracion', dia: 'viernes',
      inicio: '2026-11-20T18:00:00-06:00', fin: '2026-11-20T21:00:00-06:00',
      hora: '6:00', ampm: 'p.m.',
      titulo: 'Gran Inauguración de la Fiesta Patronal', icono: 'trompeta',
      frase: 'Arranca la fiesta con mariachi y recorrido por el pueblo.',
      lugar: 'la Explanada Principal',
      datos: [
        { icono: 'pin', texto: 'Punto de partida: entrada de Calle Solidaridad.' },
        { icono: 'ruta', texto: 'Recorrido hacia la Explanada Principal. Llega y termina en el kiosco de la comunidad.' },
        { icono: 'nota', texto: 'Con el Mariachi Fiesta Mexicana, «El Orgullo de Ixtlahuaca».' }
      ]
    },
    {
      id: 'sonidero', dia: 'viernes',
      inicio: '2026-11-20T21:00:00-06:00', fin: '2026-11-21T02:00:00-06:00',
      hora: '9:00', ampm: 'p.m.',
      titulo: 'Baile Sonidero', icono: 'bocina',
      frase: 'Para los que no se cansan de bailar.',
      lugar: 'la Explanada Principal',
      datos: [
        { icono: 'nota', texto: 'El Caballero y El Destructor de Gigantes.' },
        { icono: 'pin', texto: 'Explanada Principal.' }
      ]
    },
    {
      id: 'cabalgata', dia: 'sabado',
      inicio: '2026-11-21T08:00:00-06:00', fin: '2026-11-21T11:00:00-06:00',
      hora: '8:00', ampm: 'a.m.',
      titulo: 'Gran Cabalgata en honor a Cristo Rey', icono: 'herradura',
      frase: 'Ensilla temprano.',
      lugar: 'el Salón El Magueyal',
      datos: [
        { icono: 'pin', texto: 'Punto de reunión: Salón El Magueyal.' },
        { icono: 'gente', texto: 'Invitan Melanie Téllez, Alejandra Téllez y la Delegación.' }
      ]
    },
    {
      id: 'rodeo-infantil', dia: 'sabado',
      inicio: '2026-11-21T17:00:00-06:00', fin: '2026-11-21T20:00:00-06:00',
      hora: '5:00', ampm: 'p.m.',
      titulo: 'Rodeo Infantil Téllez 2026', icono: 'sombrero',
      frase: 'Para los vaqueros más chiquitos de la casa.',
      lugar: 'la Explanada Principal',
      datos: [
        { icono: 'pin', texto: 'Explanada Principal.' },
        { icono: 'regalo', texto: 'Entrada gratuita. Sorpresas y regalos.' }
      ]
    },
    {
      id: 'futbol', dia: 'sabado',
      inicio: '2026-11-21T18:00:00-06:00', fin: '2026-11-21T21:30:00-06:00',
      hora: '6:00', ampm: 'p.m.',
      titulo: 'Cuadrangular Cristo Rey 2026 de Fútbol', etiqueta: 'Varonil libre', icono: 'balon',
      frase: 'Cuatro equipos y una gran final.',
      lugar: 'la Unidad Deportiva',
      datos: [
        { icono: 'pin', texto: 'Cancha de Fútbol Rápido de la Unidad Deportiva.' }
      ],
      lista: { titulo: 'Equipos', items: ['Banak FC', 'Amigos FC', 'Chivas Téllez', 'Galaxy'] },
      rol: [
        ['6:00 a 7:00 p.m.', 'Primer partido'],
        ['7:00 a 8:00 p.m.', 'Segundo partido'],
        ['8:30 a 9:30 p.m.', 'Gran final']
      ]
    },
    {
      id: 'rodeo-baile', dia: 'sabado',
      inicio: '2026-11-21T20:00:00-06:00', fin: '2026-11-22T02:00:00-06:00',
      hora: '8:00', ampm: 'p.m.',
      titulo: 'Gran Rodeo-Baile 2026', icono: 'toro',
      frase: 'Jaripeo y baile en la misma noche.',
      lugar: 'la Explanada Principal',
      datos: [
        { icono: 'nota', texto: 'Durante el jaripeo: Banda Reyna de Casa.' },
        { icono: 'nota', texto: 'Para el baile: Banda La Potente del Bajío.' },
        { icono: 'pin', texto: 'Explanada Principal.' }
      ],
      lista: { titulo: 'Ranchos participantes', items: ['Rancho Cruz de Madera', 'Rancho 5 Hermanos', 'Rancho ALVA', 'Rancho La Mora, de Aurelio Bravo'] }
    },
    {
      id: 'caravana', dia: 'domingo',
      inicio: '2026-11-22T09:00:00-06:00', fin: '2026-11-22T13:00:00-06:00',
      hora: '9:00', ampm: 'a.m.',
      titulo: 'Gran Caravana Trokera', icono: 'trailer',
      frase: 'Torton, tracto y rabón. Que suenen esos claxons.',
      lugar: 'el Boulevard Téllez – Pachuca',
      datos: [
        { icono: 'pin', texto: 'Punto de reunión: Boulevard Téllez – Pachuca.' },
        { icono: 'ruta', texto: 'El recorrido arranca a las 11:00 a.m. y termina en la cancha de fútbol regular, junto al CECyTE.' }
      ]
    },
    {
      id: 'misa', dia: 'domingo',
      inicio: '2026-11-22T13:00:00-06:00', fin: '2026-11-22T14:00:00-06:00',
      hora: '1:00', ampm: 'p.m.',
      titulo: 'Santa Misa en honor a Cristo Rey', icono: 'iglesia',
      frase: 'Ven con toda tu familia.',
      lugar: 'la Iglesia de Cristo Rey',
      datos: [
        { icono: 'pin', texto: 'Iglesia de Cristo Rey.' }
      ]
    },
    {
      id: 'basquet', dia: 'domingo',
      inicio: '2026-11-22T14:00:00-06:00', fin: '2026-11-22T18:00:00-06:00',
      hora: '2:00', ampm: 'a 6:00 p.m.',
      titulo: 'Torneo de Básquetbol', icono: 'basquet',
      frase: 'Cuatro partidos seguidos, toda la tarde.',
      lugar: 'la Cancha de la Deportiva',
      datos: [
        { icono: 'pin', texto: 'Cancha de la Deportiva, junto al Centro de Salud.' }
      ],
      rol: [
        ['2:00 a 3:00 p.m.', 'Leones vs. Navarra Warriors'],
        ['3:00 a 4:00 p.m.', 'Kings vs. Nova'],
        ['4:00 a 5:00 p.m.', 'Bucks vs. Caballeros'],
        ['5:00 a 6:00 p.m.', 'Zellet vs. Seos']
      ]
    },
    {
      id: 'danza', dia: 'domingo',
      inicio: '2026-11-22T18:00:00-06:00', fin: '2026-11-22T19:30:00-06:00',
      hora: '6:00', ampm: 'p.m.',
      titulo: 'Presentación del Club de Danza', icono: 'danza',
      frase: 'Faldas al vuelo y mucho zapateado.',
      lugar: 'la Explanada Principal',
      datos: [
        { icono: 'gente', texto: 'Club de Danza de la Telesecundaria 82 de Jagüey de Téllez.' },
        { icono: 'pin', texto: 'Explanada Principal.' }
      ]
    },
    {
      id: 'bailazo', dia: 'domingo', estelar: true,
      inicio: '2026-11-22T20:30:00-06:00', fin: '2026-11-23T02:30:00-06:00',
      hora: '8:30', ampm: 'p.m.',
      titulo: 'Gran Bailazo de Lujo', icono: 'microfono',
      frase: 'Lo más estelar de la fiesta.',
      lugar: 'la Explanada Principal',
      datos: [
        { icono: 'pin', texto: 'Explanada Principal.' }
      ],
      artistas: ['Marco Flores y la Banda Jerez', 'Dalia Sosa y su Ritmo Colombiano', 'Código Especial']
    }
  ],

  lugares: [
    { nombre: 'Explanada Principal', para: 'Bailes, rodeos, danza y el Gran Bailazo del domingo' },
    { nombre: 'Iglesia de Cristo Rey', para: 'Santa Misa del domingo' },
    { nombre: 'Unidad Deportiva', para: 'Cuadrangular de fútbol, en la cancha de fútbol rápido' },
    { nombre: 'Cancha de la Deportiva, junto al Centro de Salud', para: 'Torneo de básquetbol' },
    { nombre: 'Salón El Magueyal', para: 'Reunión de la cabalgata' },
    { nombre: 'Boulevard Téllez – Pachuca', para: 'Reunión de la caravana trokera' }
  ]
};
