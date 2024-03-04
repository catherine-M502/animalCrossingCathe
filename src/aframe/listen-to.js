AFRAME.registerComponent("listen-to", {
  multiple: true,

  schema: {
    target: { type: "selector" },
    event: { type: "string", default: "click" },
    emit: { type: "string", default: "click" },
    audioSrc: { type: "string" },
  },

  init: function () {
    this.onEvent = this.onEvent.bind(this);
    this.data.target.addEventListener(this.data.event, this.onEvent);
  },

  onEvent: function (evt) {
    this.el.emit(this.data.emit, evt.detail);

    if (this.data.audioSrc) {
      if (!this.audioElement) {
        this.audioElement = new Audio(this.data.audioSrc);
      }

      this.audioElement.play();
    }
  },

  update: function (oldData) {
    if (
      oldData.target != this.data.target ||
      oldData.event != this.data.event ||
      oldData.audioSrc != this.data.audioSrc
    ) {
      if (oldData.target)
        oldData.target.removeEventListener(oldData.event, this.onEvent);

      this.data.target.addEventListener(this.data.event, this.onEvent);

      if (this.audioElement) {
        this.audioElement.src = this.data.audioSrc;
      } else {
        this.audioElement = new Audio(this.data.audioSrc);
      }
    }
  },

  remove: function () {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }

    this.data.target.removeEventListener(this.data.event, this.onEvent);
  },
});
