class event extends EventEmitter {
  
}

class Movie {
  constructor(title, year, duration) {
    this.title = title;
    this.year = year;
    this.duration = duration;
  }

  getTitle() {
    console.log(this.title);
  }

  getYear() {
    console.log(this.year);
  }

  getDuration() {
    console.log(this.duration);
  }

  play() {
    console.log("play");
  }

  pause() {
    console.log("pause");
  }

  resume() {
    console.log("resume");
  }
}
