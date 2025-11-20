import gordyNote from './assets/ransom/gordy-note.png';
import darlaNote from './assets/ransom/darla-note.png';
import marthaNote from './assets/ransom/martha-note.png';
import aaronNote from './assets/ransom/aaron-note.png';
import cityHallPicture from './assets/cityHall.png';
import recording from './assets/recording.png';



export const docList = [
  {
    label: 'Gordy Note',
    docImage: gordyNote,
    id: 'gordy-note',
    show: false,
    regex: [/SHOW_NOTE_Gordy/i],
  },
  {
    label: 'Darla Note',
    docImage: darlaNote,
    id: 'darla-note',
    show: false,
    regex: [/SHOW_NOTE_Darla/i],
  },
  {
    label: 'Martha Note',
    docImage: marthaNote,
    id: 'martha-note',
    show: false,
    regex: [/SHOW_NOTE_Martha/i],
  },
  {
    label: 'Aaron Note',
    docImage: aaronNote,
    id: 'aaron-note',
    show: false,
    regex: [/SHOW_NOTE_Aaron/i],
  },
  {
    label: 'Recording',
    // docContent: 'I AM A RECORDING',
    docImage: recording,
    id: 'recording',
    show: false,
    regex: [/SHOW_RECORDING/i],
  },
  {
    label: 'City Hall Picture',
    docImage: cityHallPicture,
    id: 'cityHall',
    show: false,
    regex: [/SHOW_CITY_HALL_PICTURE/i],
  },
];
