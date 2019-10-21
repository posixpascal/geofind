// Use codes between 0~127 for lesser throughput (1 byte)

class Protocol {
  static int JOIN_ROOM = 10;
  static int JOIN_ERROR = 11;
  static int LEAVE_ROOM = 12;
  static int ROOM_DATA = 13;
  static int ROOM_STATE = 14;
  static int ROOM_STATE_PATCH = 15;
}

utf8Read(DataView view, int offset) {
  const length = view.getUint8(offset++);

  var string = '',
      chr = 0;
  for (var i = offset, end = offset + length; i < end; i++) {
    var byte = view.getUint8(i);
    if ((byte & 0x80) == 0x00) {
      string += String.fromCharCode(byte);
      continue;
    }
    if ((byte & 0xe0) == 0xc0) {
      string += String.fromCharCode(
          ((byte & 0x1f) << 6) |
          (view.getUint8(++i) & 0x3f)
      );
      continue;
    }
    if ((byte & 0xf0) == 0xe0) {
      string += String.fromCharCode(
          ((byte & 0x0f) << 12) |
          ((view.getUint8(++i) & 0x3f) << 6) |
          ((view.getUint8(++i) & 0x3f) << 0)
      );
      continue;
    }
    if ((byte & 0xf8) == 0xf0) {
      chr = ((byte & 0x07) << 18) |
      ((view.getUint8(++i) & 0x3f) << 12) |
      ((view.getUint8(++i) & 0x3f) << 6) |
      ((view.getUint8(++i) & 0x3f) << 0);
      if (chr >= 0x010000) { // surrogate pair
        chr -= 0x010000;
        string +=
            String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
      } else {
        string += String.fromCharCode(chr);
      }
      continue;
    }
    throw new Error('Invalid byte ' + byte.toString(16));
  }
  return string;
}

// Faster for short strings than Buffer.byteLength
utf8Length(String str) {
  var c = 0;
  var length = 0;
  for (var i = 0, l = str.length; i < l; i++) {
    c = str.charCodeAt(i);
    if (c < 0x80) {
      length += 1;
    } else if (c < 0x800) {
      length += 2;
    } else if (c < 0xd800 || c >= 0xe000) {
      length += 3;
    } else {
      i++;
      length += 4;
    }
  }
  return length + 1;
}
