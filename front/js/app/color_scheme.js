var default_color_scheme = {
  0: "#2C3E50",
  1: "#E74C3C",
  2: "#2980B9",
  3: "#FF9800",
  4: "#5C832F",
  5: "#382513",
  6: "#2F343B",
  7: "#332532",
  8: "#644D52",
  9: "#00A388",
};

var customColorScheme = false;

var color_scheme = {};
var cls_to_ind = {};


function initColorScheme(jsonStr) {
    let jsonParams = JSON.parse(jsonStr);

    // if (1 > 2) {
    if (jsonParams.colors) {
      // Clean existing colorscheme
      color_scheme = {};

      jsonParams.classes.forEach(function (cls) {
          color_scheme[cls] = jsonParams.colors[cls];
      });

      customColorScheme = true;

    } else {
      for (let i in jsonParams.classes) {
          cls_to_ind[jsonParams.classes[i]] = i % Object.keys(default_color_scheme).length;
      }
    }
}

function colorForClass(cls) {
    if (customColorScheme) {
        if (cls in color_scheme) {
            return color_scheme[cls];
        } else {
            return "";
        }
    } else {
        return default_color_scheme[cls_to_ind[cls]];
    }
}
