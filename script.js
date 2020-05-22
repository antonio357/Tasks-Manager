const fs = require("fs");

class JsonData {
    constructor(path) {
        this.path = path;
        this.data = new Set()
        this.init()
    }
    save() {
        fs.writeFileSync(this.path, JSON.stringify(Array.from(this.data), null, 4));
    }
    init() {
        if (!fs.existsSync(this.path)) fs.writeFileSync(this.path, JSON.stringify(`${this.path} inicialized`))
        this.load()
    }
    load() {
        let temp = JSON.parse(fs.readFileSync(this.path))
        if (temp === `${this.path} inicialized`) return
        else {
            temp.forEach(element => {
                this.data.add(new Task(element.name))
            });
        } 
    }
}

class Project extends JsonData {
    constructor(name, path) {
        super(`${name}_${path}`);
        this.name = name;
    }
    addTask(task) {
        this.data.add(task)
    }
}

class Task {
    constructor(name) {
        this.name = name;
        this.status = "To Do";
    }
    print() {
        console.log("printing")
    }
}

let project = new Project("project", "data.json");

project.addTask(new Task(1))
project.addTask(new Task(2))
project.addTask(new Task(3))
project.addTask(new Task(1))
project.save()
