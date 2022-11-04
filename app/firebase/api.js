import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from './firebase';
const collectionName = 'your_urls';
const collectionlog = 'log_urlsShort';

export const saveWebsite = newLink =>
  addDoc(collection(db, collectionName), newLink);

export const savelog = datalog =>
  addDoc(collection(db, collectionlog), datalog);

export const updateWebsite = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const onGetLinks = callback => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

export const getWebsiteShort = short =>
  getDocs(query(collection(db, collectionName), where('short', '==', short)));

export const getWebsites = () => getDocs(collection(db, collectionName));

export const deleteWebsite = id => deleteDoc(doc(db, collectionName, id));

export const getWebsite = id => getDoc(doc(db, collectionName, id));

export const updateClicksCountries = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const getGroupCountry = async id => {
  const querySnapshot = await getDocs(
    query(collection(db, collectionlog), where('idurl', '==', id)),
  );

  const countries = [];
  const weeks = [];
  const days = [];
  let drill = {};

  querySnapshot.forEach(data => {
    const datos = data.data();

    // Clicks por Paises ----------------------------------------------------------------
    const found = countries.find(
      obj => obj.country === datos.countryCode.toLowerCase(),
    );

    if (found) {
      found.clicks += 1;
    } else {
      const reg = { country: datos.countryCode.toLowerCase(), clicks: 1 };
      countries.push({ ...reg });
    }

    // Clicks por Fecha -----------------------------------------------------------------
    const fecha = new Date(datos.DateTime.toDate().toString());

    // Semanas
    function getWeek() {
      const a = new Date(fecha.getFullYear(), 0, 1);
      const b = Math.floor((fecha - a) / (24 * 60 * 60 * 1000));
      return Math.ceil(b / 7);
    }

    function getWeekLength(x = 'end') {
      let a = new Date(Date.now());
      a = a.getFullYear();

      const b = new Date();
      const c = getWeek() * 7;

      if (x === 'start') {
        b.setFullYear(a, 0, c - 4);
        if (b.getFullYear() !== fecha.getFullYear()) b.setFullYear(a, 0, 1);
      } else {
        b.setFullYear(a, 0, c + 2);
        if (b.getFullYear() !== fecha.getFullYear()) b.setFullYear(a, 11, 31);
      }

      return b.toLocaleDateString();
    }

    const week = getWeek() + 1;
    const weekFound = weeks.find(obj => obj.drilldown === week);

    if (weekFound) weekFound.y += 1;
    else {
      const reg = {
        drilldown: week,
        y: 1,
        name: `${getWeekLength('start')} - ${getWeekLength()}`,
      };
      weeks.push({ ...reg });
    }

    // Dias de las semanas
    // Domingo = 0
    const dias = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];

    const day = dias[fecha.getDay()];
    const dayFound = days.find(obj => obj[0] === day);

    if (dayFound) dayFound[1] += 1;
    else days.push([...[day, 1]]);

    drill = {
      name: `${getWeekLength('start')} - ${getWeekLength()}`,
      id: week,
      data: days,
    };
  });

  // console.log(days);
  // console.log(weeks);
  console.log(drill);

  // Retornar Valores de la Funcion --------------------------------------------------
  const ready = [];
  countries.forEach(data => {
    const propertyNames = Object.values(data);
    ready.push([...propertyNames]);
  });

  return { mapamundi: ready, line: weeks, drill };
};

// console.log(weeks);
// console.log(aa[5].reduce((partialSum, a) => partialSum + a, 0));
// console.log(new Date(Date.now()).getDay());
// console.log(new Date(Date.now()));
