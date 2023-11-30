function generateHexArray(length) {
    let hexArray = [];
    for (let i = 0; i < length; i++) {
      let hexValue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
      hexArray.push(hexValue);
    }
    return hexArray;
  }