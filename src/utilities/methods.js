import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ImAvatar from '../assets/img/avatar.png';
import ImAvatarMale from '../assets/img/avatar-male.png';
import ImAvatarFemale from '../assets/img/avatar-female.png';
dayjs.extend(customParseFormat);
// Get avatar by gender
export const avatarByGender = (avatar, gender) => {
  if (avatar !== null) {
    return avatar;
  }
  if (gender === 'male') {
    return ImAvatarMale;
  }
  if (gender === 'female') {
    return ImAvatarFemale;
  }
  return ImAvatar;
};
export const DivisionsReformat = (division) => {
  let res = division || '';
  if (division) {
    if (parseInt(division[0]) >= 1 && parseInt(division[0]) <= 9) {
      if (division.includes('ère') || division.includes('ème')) {
        res = `${division[0]}<sup>${
          division.includes('ère') ? 'ère' : 'ème'
        }</sup>${division.substr(5)}`;
      }
    }
  }
  return res;
};
