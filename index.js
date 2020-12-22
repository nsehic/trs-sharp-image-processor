const sharp = require("sharp");
const fs = require("fs");

fs.readdir("./images/", (err, files) => {
  files.forEach((file) => {
    const fileName = file.split(".")[0];

    const image = sharp(`./images/${file}`);

    image
      .metadata()
      .then((metadata) => {
        if (metadata.width > metadata.height) {
          const vHeight = (1800 / metadata.width) * metadata.height;
          const verticalPad = Math.floor((2000 - vHeight) / 2);

          return image
            .resize({ width: 1800 })
            .flatten({ background: "#ffffff" })
            .extend({
              left: 100,
              right: 100,
              top: verticalPad,
              bottom: verticalPad,
              background: {
                r: 255,
                g: 255,
                b: 255,
                alpha: 100,
              },
            })
            .jpeg()
            .toFile(`./output/${fileName}.jpeg`, (err, info) => {});
        } else if (metadata.height > metadata.width) {
          const vWidth = (1800 / metadata.height) * metadata.width;
          const horizontalPad = Math.floor((2000 - vWidth) / 2);
          return image
            .resize({ height: 1800 })
            .flatten({ background: "#fff" })
            .extend({
              left: horizontalPad,
              right: horizontalPad,
              top: 100,
              bottom: 100,
              background: {
                r: 255,
                g: 255,
                b: 255,
                alpha: 100,
              },
            })
            .jpeg()
            .toFile(`./output/${fileName}.jpeg`, (err, info) => {});
        } else {
          return image
            .resize({ width: 1800 })
            .flatten({ background: "#fff" })
            .extend({
              left: 100,
              right: 100,
              top: 100,
              right: 100,
              background: {
                r: 255,
                g: 255,
                b: 255,
                alpha: 100,
              },
            })
            .jpeg()
            .toFile(`./output/${fileName}.jpeg`, (err, info) => {});
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
