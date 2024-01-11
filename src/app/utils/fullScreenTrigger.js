const fullScreenTrigger = {
  open: (elem) => {
    const el = elem ?? document.getElementsByTagName("body")[0];

    if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
    else if (el?.requestFullscreen) el?.requestFullscreen();
  },
  close: () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  },
};

export default fullScreenTrigger;
