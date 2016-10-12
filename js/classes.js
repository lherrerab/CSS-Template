class EventEmitter {

  constructor() {
    this.listeners = new Map();
  }

  on(label, callback) {
    this.listeners.has(label) || this.listeners.set(label, []);
    this.listeners.get(label).push(callback);
  }

  off(label, callback) {
    let listeners = this.listeners.get(label);
    let index;

    if (listeners && listeners.length) {
        index = listeners.reduce((i, listener, index) => {
            return (isFunction(listener) && listener === callback) ?
                i = index :
                i;
        }, -1);

        if (index > -1) {
            listeners.splice(index, 1);
            this.listeners.set(label, listeners);
            return true;
        }
    }
    return false;
  }

  emit(label, ...args) {
    let listeners = this.listeners.get(label);

    if (listeners && listeners.length) {
        listeners.forEach((listener) => {
            listener(...args);
        });
        return true;
    }
    return false;
  }
}

/*class Observer {
  constructor(id, subject) {
    this.id = id;
    this.subject = subject;
    this.subject.on("change", (data) => this.onChange(data));
  }
  onChange(data) {
    console.log(`${this.id} notified of change:`, data);
  }
}*/

class Movie extends EventEmitter {
  constructor(title, year, duration) {
    super();
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

class Logger {
  constructor() {
    //this..on("play", (data) => this.log(info));
  }
  setMovie(movie) {
    this.movie = movie;
    this.movie.on("play", (info) => this.onChange(info));
  }

  log(info) {
    console.log(info);
  }
}
