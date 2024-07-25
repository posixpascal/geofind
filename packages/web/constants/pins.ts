export const PINS = Array.from({length: 32}).reduce((acc: any, cur, i) => {
  return {
    ...acc,
    [i + 1]: require(`~/assets/pins/${i + 1}.svg`)
  }
}, {});

export const PIN_COLORS = {"1":"#ff6347","10":"#8a2be2","11":"#f0e68c","12":"#ff1493","13":"#228b22","14":"#ff4500","15":"#da70d6","16":"#20b2aa","17":"#ff7f50","18":"#90ee90","19":"#6495ed","2":"#87ceeb","20":"#db7093","21":"#ffa07a","22":"#00fa9a","23":"#00ffff","24":"#ee82ee","25":"#40e0d0","26":"#7fff00","27":"#ffe4b5","28":"#ffc0cb","29":"#9acd32","3":"#7cfc00","30":"#1e90ff","31":"#ff4500","32":"#b0e0e6","4":"#ffd700","5":"#ff69b4","6":"#ffa500","7":"#4b0082","8":"#adff2f","9":"#00bfff"}