import aaron from '../assets/avator/aaron.png'
import darla from '../assets/avator/darla.png';
import gordy from '../assets/avator/gordy.png';
import martha from '../assets/avator/martha.png';
import raymond from '../assets/avator/raymond.png';
import { Character } from '../../../components/chat/types';

export const chars: Character[] = [
  {
    name: 'Det. Holt',
    profileImage: raymond,
    regex: [/Raymond Holt:/i,/Holt:/i, /Raymond:/i],
    id: 'raymond',
  },
  {
    name: 'Aaron Heller',
    profileImage: aaron,
    regex: [/Aaron:/i, /Heller:/i],
    id: 'aaron',
  },
  {
    name: 'Darla Orlander',
    profileImage: darla,
    regex: [/Darla:/i, /Orlander:/i],
    id: 'darla',
  },
  {
    name: 'Gordy Skoglund',
    profileImage: gordy,
    regex: [/Gordy:/i, /Skoglund:/i],
    id: 'gordy',
  },
  {
    name: 'Martha Kellen',
    profileImage: martha,
    regex: [/Martha:/i, /Kellen:/i],
    id: 'martha',
  },
];


export default chars;