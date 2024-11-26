class toDo {
    #tasks = [];
    constructor(posts) {
        this.posts = posts;
    }

    // Method
    //Remplir le tableau tasks des todo list du site 
    fillTask() {
        this.posts.forEach(element => {
            this.#tasks.push(new todoItem(element.title, element.completed,element.id));
        });
    }

    createLi(content,status, id){
        const li =document.createElement('li');
        let checkboxStatus = '';
        li.classList.add("todo", "list-group-item", "d-flex", "align-items-center");
        if(status){
            checkboxStatus = 'checked';
        }
        li.innerHTML = `
                <input class="form-check-input" type="checkbox" id="${id}" ${checkboxStatus}>
                <label class="ms-2 form-check-label" for="${id}">
                ${content}
                </label>
                <label class="ms-auto btn btn-danger btn-sm">
                <i class="bi-trash">
                </i>
                </label>
        `;
     return li;
    }

    //les taches sont ajoutées au DOM
    update(tab){
        const ul = document.querySelector('ul');
        for(let i = 0; i<tab.length;i++){
            ul.append(this.createLi(tab[i].content,tab[i].status,tab[i].id));
        }
    }

    get tasks() {
        return this.#tasks;
    }
    
    filterTask(choice){
      const ul = document.querySelector('ul');
      ul.innerHTML='';

      if(choice === 'done'){
        this.update(this.tasks.filter(({status})=>status === true));
      }else if (choice ==='toDo'){
        this.update(this.tasks.filter(({status})=>status === false));
      }else if(choice ==='all'){
        this.update(this.tasks);
      }
    }

    addTask(){
        const input = document.querySelector('input[type=text]');
        if(input && input.value.trim()!==""){
            //créer id
            let idTask = 0 ;
            while(this.#tasks.find(({id})=>id ===idTask)){
                idTask++;
            }
            this.#tasks.push(new todoItem(input.value , false, idTask));
            const ul = document.querySelector('ul');
            ul.append(this.createLi(input.value,false, idTask));
        }
    }
    //Delete task
    deleteTask(i){
        const id =  this.#tasks.findIndex(({id})=>id ===i);
        if(typeof(id) !==undefined){
            this.#tasks.splice(id,1);
            document.querySelector('ul').innerHTML = '';
            this.update(this.#tasks);
        }
    }
    selectToDoItem(i){
        return this.#tasks.find(({id})=>id ===i);
    }
    
}