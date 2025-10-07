interface dataType {
  data: string;
  dataName: string;
  time: string[];
}

export const getMonthName = (i: number) => {
  const monthNames = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];
  return monthNames[i];
};

export const getDayName = (i: number) => {
  const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

  return days[i];
};

export const dataTime = () => {
  const masiv: dataType[] = Array.from({ length: 7 }, () => ({
    data: '',
    dataName: '',
    time: [],
  }));
  masiv.map((obj, i) => {
    const date = new Date();
    date.setDate(date.getDate() + 2 + i);

    obj.data = getDayName(date.getDay());
    obj.dataName = `${date.getDate()} ${getMonthName(date.getMonth())}`;

    const weekday = [
      '10:00-12:00',
      '12:00-14:00',
      '14:00-16:00',
      '16:00-18:00',
      '18:00-20:00',
      '20:00-22:00',
    ];
    const weekend = ['12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00'];

    masiv.map((obj) =>
      obj.data !== 'сб' && obj.data !== 'вс' ? (obj.time = weekday) : (obj.time = weekend),
    );
  });
  return masiv;
};
