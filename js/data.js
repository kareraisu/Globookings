var sp0 = new Floor({
  img: 'img/floors/SP-0.png',
  map: [
    "339, 678, 359, 625, 406, 625, 406, 677", //MATISSE
    "359, 584, 407, 622",   // BOTERO
    "297, 456, 405, 525",   // BOARD
    "405, 457, 530, 525",   // VAN GOGH
    "169, 358, 213, 429",   // KLIMT
    "169, 302, 213, 357",   // GAUGIN
    "531, 388, 562, 430",   // RIVERA
    "563, 389, 595, 430",   // PICASSO
    "563, 283, 595, 323",   // ESCHER
    "463, 105, 515, 160",   // KAHLO
    "541, 105, 617, 160",   // WARHOL
    "407, 21, 451, 86",    // MONDRIAN
    "453, 21, 498, 86",     // KLEE
    ],
  rooms: [{
    name: 'MATISSE',
    capacity: 6,
    extra: '1 window',
    },{
    name: 'BOTERO',
    capacity: 3,
    extra: 'No windows',
    },{
    name: 'BOARD',
    capacity: 0,
    extra: '',
    },{
    name: 'VAN GOGH',
    capacity: 0,
    extra: '',
    },{
    name: 'KLIMT',
    capacity: 0,
    extra: '',
    },{
    name: 'GAUGIN',
    capacity: 0,
    extra: '',
    },{
    name: 'RIVERA',
    capacity: 0,
    extra: '',
    },{
    name: 'PICASSO',
    capacity: 0,
    extra: '',
    },{
    name: 'ESCHER',
    capacity: 0,
    extra: '',
    },{
    name: 'KAHLO',
    capacity: 0,
    extra: 'Brainstorming room',
    },{
    name: 'WARHOL',
    capacity: 0,
    extra: 'Music room',
    },{
    name: 'MONDRIAN',
    capacity: 0,
    extra: '',
    },{
    name: 'KLEE',
    capacity: 0,
    extra: '',
  }]
});


var sp1 = new Floor({
  img: '',
  map: [],
  rooms: [{
    name: 'ROOM 1',
    capacity: 1234,
    extra: 'This is a test',
    },{
    name: 'ROOM 2',
    capacity: 5678,
    extra: 'This is another test',
  }]
});


var sites = [{
  name: 'North Park',
  floors: []
  },{
  name: 'Laminar',
  floors: []
  },{
  name: 'Alsina',
  floors: []
  },{
  name: 'South Park',
  floors: [sp0, sp1]
},];