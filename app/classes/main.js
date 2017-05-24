function Sheet(title, desc, members, comments, dueDate, timeTraking, attachments, checklists) {
    this.title = title;
    this.desc = desc;
    this.members = members;
    this.comments = comments;
    this.dueDate = dueDate;
    this.timeTraking = timeTraking;
    this.attachments = attachments;
    this.checklists = checklists;
}

function Column(id, title, tasksCount, estimate, remain) {
    this.id = id;
    this.title = title;
    this.sheets = [];
    this.estimate = estimate;
    this.remain = remain;
    this.addSheet = function (title, desc, members, comments) {
        this.sheets.push(new Sheet(title, desc, members, comments));
    };
}

function Board(id, name) {
    this.id = id;
    this.name = name;
    this.columns = [];
    this.addColumn = function (id, title, tasksCount, estimate, remain) {
        this.columns.push(new Column(id, title, tasksCount, estimate, remain));
    };
}

function CheckList(name, description, checked) {
    this.name = name;
    this.description = description;
    this.checked = checked;
}