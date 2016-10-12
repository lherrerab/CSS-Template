class EventEmitter {

  constructor() {
    this.listeners = new Map();
  }

  on(label, callback) {
    this.listeners.has(label) || this.listeners.set(label, []);
    this.listeners.get(label).push(callback);
  }

  let isFunction = function(obj) {
    return typeof obj == 'function' || false;
  };

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

class Observer {
  constructor(id, subject) {
    this.id = id;
    this.subject = subject;
    this.subject.on("change", (data) => this.onChange(data));
  }
  onChange(data) {
    console.log(`${this.id} notified of change:`, data);
  }
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
