let app = new function () {
    //Referencing out HTML- we are getting all our tasks from the table body, id="tasks". Then we make it an empty array to fill them into! 
    this.el = document.getElementById('tasks');
    this.tasks = []

    //Below is our CRUD - Fetch will be Read, Add will be Create, Edit will be Update, and Delete will be our Delete lol
    this.FetchAll = function () {
        let data = '';
        //Want to display line items in the table IF there actually /are/ items
        if (this.tasks.length > 0) {
            for (i = 0; i < this.tasks.length; i++) {
                //basically making strings with html and data in them
                data += '<tr>';
                data += '<td>' + (i + 1) + '. ' + this.tasks[i] + '</td>';
                data += '<td><button onclick="app.Edit(' + i + ')" class="btn btn-warning">Edit</button></td> ';
                data += '<td><button onclick="app.Delete(' + i + ')" class="btn btn-danger">Delete</button></td> ';
                data += '</tr>'
            }
        }
        //outside of the conditional we need to call the count function so we can give it a count and then put that data into the element
        this.Count(this.tasks.length);
        return this.el.innerHTML = data

    };

    this.Add = function () {
        el = document.getElementById('add-todo');
        let task = el.value;
        if (task) {
            this.tasks.push(task.trim());
            el.value = '';
            this.FetchAll();
        }
    };

    this.Edit = function (item) {
        el = document.getElementById('edit-todo');
        el.value = this.tasks[item]
        document.getElementById('edit-box').style.display = 'block';
        let self = this;

        document.getElementById('save-edit').onsubmit = function () {
            let task = el.value;
            if (task) {
                self.tasks.splice(item, 1, task.trim())
                self.FetchAll();;
                CloseInput();
            }
        }
    };


    //splice() removes from our item from the array, one at a time

    this.Delete = function (item) {
        this.tasks.splice(item, 1)
        this.FetchAll();

    };

    /* We want to keep track of the items we've added to the list, so lets count them:
    Added conditionals so that the counter is plural when more than one task added */

    this.Count = function (data) {
        let el = document.getElementById('counter');
        let name = 'Tasks';
        if (data) {
            if (data == 1) {
                name = 'Task';
            }
            el.innerHTML = data + ' ' + name;
        } else {
            el.innerHTML = "No " + name;

        }
    };


}
//Then we want to keep our list updated consistently so we call to our FetchAll(); 
app.FetchAll();

//We also want to close our edit-box after- display will be set to none.
function CloseInput() {
    document.getElementById('edit-box').style.display = 'none';
}