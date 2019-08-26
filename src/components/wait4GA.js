export default () => {
  return new Promise((resolve, reject) => {
    let timeStart = Date.now();
    const TIMEOUT = 3000;

    let _isLoaded = () => {
      if (Date.now() - timeStart > TIMEOUT) {
        reject("GA not resolved! Please turn off AdBlock and reload the page");
        return;
      }
      if (window.ga && window.ga.create) {
        resolve(window.ga);
        return;
      } else {
        setTimeout(_isLoaded, 350);
      }
    };

    _isLoaded();
  });
};
