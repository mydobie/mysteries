
import aaron from './assets/avator/aaron.png';
import darla from './assets/avator/darla.png';
import gordy from './assets/avator/gordy.png';
import martha from './assets/avator/martha.png';
import raymond from './assets/avator/raymond.png';

const chars =  [
     {name: 'Det. Holt', image: raymond, regex: [/Holt/i, /Raymond/i]},
  {name: 'Aaron Heller', image: aaron, regex: [/Aaron/i, /Heller/i]},
  {name: 'Darla Orlander', image: darla, regex: [/Darla/i, /Orlander/i]},
  {name: 'Gordy Skoglund', image: gordy, regex: [/Gordy/i, /Skoglund/i]},
  {name: 'Martha Kellen', image: martha, regex: [/Martha/i, /Kellen/i]},
 
];


export default (response:string) => {
   return chars.find(char => char.regex.some(regex => regex.test(response)));
}