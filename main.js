async function main() {
    try {
        const r = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
            headers: {
                Accept: 'application/json'
            }
        });
        if (!r.ok) {
            throw new Error('Erreur serveur!');
        }
        return await r.json();
    } catch (error) {
        console.log('Impossible de charger la page');
        return;
    }
}


// Appel asynchrone avec await
(async () => {
    const response = await main(); // Attendre que main() se résolve et renvoie le json

        const test = new toDo(response);
        const btn = document.querySelector('#ajouter');
        const  ul = document.querySelector('ul');
        const btnDone = document.querySelector('button[data-filter="done"]');
        const btnToDo = document.querySelector('button[data-filter="todo"]');
        const btnAll = document.querySelector('button[data-filter="all"]');

        if(response){
            test.fillTask();
        }    
        test.update(test.tasks);
       
        btn.addEventListener('click', (e)=>{
            e.preventDefault();
            test.addTask();
        }); 

        //Supprimer un item toDO
        document.addEventListener('click',(e)=>{
                if(e.target.classList.contains('btn-danger')  ){
                    test.deleteTask(Number(e.target.parentElement.firstElementChild.id));

                }else if( e.target.classList.contains('bi-trash')){
                    test.deleteTask(Number(e.target.parentElement.parentElement.firstElementChild.id));
                }
        });
        
        //Mettre à jour un item toDo
        ul.addEventListener('change',(e)=>{
            if(e.target.matches('input[type=checkbox]')){
                if(e.target.checked){
                    test.selectToDoItem(Number(e.target.id)).done();
                }else{
                    test.selectToDoItem(Number(e.target.id)).undone();
                }
            } 
        });
        btnDone.addEventListener('click',()=>{
            test.filterTask('done');
        });
        btnToDo.addEventListener('click',()=>{
            test.filterTask('toDo');
        });
        btnAll.addEventListener('click',()=>{
            test.filterTask('all');
        });
})();
