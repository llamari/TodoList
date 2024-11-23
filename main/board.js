class Board {
    constructor(title, index) {
        self.title = title;
        self.task_list = [];
        self.index = index;
    }

    getAsElement() {
        return document.getElementById("board" + Number.toString(index));
    }

    createTaskElement(evt) {
        let index = evt.currentTarget.board_index;

        function getElementClassName(parent, target) {
            for (let i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i].className === target) {
                    return parent.childNodes[i];
                }
            }
        }

        const board_object = document.getElementById(`board${index}`);
        const task_list = getElementClassName(board_object, "task_list");

        let input = getElementClassName(board_object, "input");
        let task_name_input = getElementClassName(input, "task_name_input");
        let task_date_input = getElementClassName(input, "task_date_input");
        let task_information_input = getElementClassName(input, "task_information_input");


        let description = task_name_input.value;
        let date = task_date_input.value;
        let information = task_information_input.value;

        if (description === "" || date === "" || information === "") {
            return; // Não cria se o título, a data, ou a descrição estiverem vazios
        }

        // Reseta o input
        task_name_input.value = "";
        task_date_input.value = "";
        task_information_input.value = "";

        // Criando a nova tarefa em HTML
        const task_object = document.createElement("li");
        const checkbox = document.createElement("input");
        const p = document.createElement("p");
        const time = document.createElement("time");
        const delete_task = document.createElement("button");

        const information_task = document.createElement("p");
        const time_tag = document.createElement("div");

        // Configurando os elementos
        task_object.className = "task";

        checkbox.type = "checkbox";
        checkbox.className = "task_checkbox";

        p.className = "task_description";
        p.innerText = description;

        information_task.type = "text";
        information_task.innerText = information;
        information_task.className = "information_task";
        

        time.className = "task_date";
        time.dateTime = date;
        time.innerText = new Date(date).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
        }); // Exibe a data formatada


        //Verificar se a tarefa estão feita

        checkbox.addEventListener('change', function (ev) {
            function getElementClassName(parent, target) {
                for (var i = 0; i < parent.childNodes.length; i++) {
                    if (parent.childNodes[i].className === target) {
                        return parent.childNodes[i]
                    }
                }
            }

            let parent = ev.currentTarget.parentElement;
            let task_description = getElementClassName(parent, "task_description");

            if (ev.currentTarget.checked) {
                task_description.id = "strikethrough"
            } else {
                task_description.id = ""
            }
        });


        
        delete_task.className = "bx bxs-trash alt";
        delete_task.id = "delete_task";

        // Evento de exclusão
        delete_task.addEventListener("click", () => {
            task_object.remove(); // Remove a tarefa do DOM
            console.log("Tarefa deletada!");
        });



        // Montando a estrutura HTML
        task_object.appendChild(checkbox);
        task_object.appendChild(p);
        task_object.appendChild(delete_task);
        task_object.appendChild(time);
        task_object.appendChild(information_task);

        const hoje = new Date();
        const dataHoje = hoje.toISOString().split('T')[0];

        const tarefaData = date.split('T')[0];

        if (tarefaData < dataHoje) {
            console.log("tarefa atrasada");
            time_tag.className = "tag_late"
            time_tag.innerText ="Atrasado";
            task_object.appendChild(time_tag);
        } else if (tarefaData === dataHoje) {
            console.log("tarefa para hoje");
            time_tag.className = "tag_duetoday"
            time_tag.innerText ="Para hoje";
            task_object.appendChild(time_tag);
        } else {
            console.log("tarefa dentro do prazo");
            time_tag.className = "tag_ontime"
            time_tag.innerText ="No prazo";
            task_object.appendChild(time_tag);
        }

        // Adicionando a nova tarefa à lista
        task_list.appendChild(task_object);
        self.task_list.push({
            description,
            date,
            information,
        });

        console.log("Nova tarefa criada:", description, date, information);

    }

    createBoardElement() {
        const board_object = document.createElement("div");
        const board_title = document.createElement("p");
        const task_list = document.createElement("ul");

        const input = document.createElement("div");
        const text_input = document.createElement("input");  //Título da task
        const date_input = document.createElement("input");
        const button = document.createElement("button");
        const information_input = document.createElement("input");  //Descrição da task

        board_object.className = "board";
        board_object.id = `board${self.index}`;

        board_title.className = "board_title";
        board_title.innerText = self.title;

        task_list.className = "task_list";

        input.className = "input";

        text_input.type = "text";
        text_input.className = "task_name_input";

        date_input.type = "date";
        date_input.className = "task_date_input";

        button.className = "task_button";
        button.innerText = "+";

        information_input.type = "text";
        information_input.className = "task_information_input";

        board_object.appendChild(board_title);
        board_object.appendChild(task_list);
        board_object.appendChild(input);
        input.appendChild(text_input);
        input.appendChild(date_input);
        input.appendChild(button);
        input.appendChild(information_input);

        button.addEventListener("click", this.createTaskElement, false);
        button.board_index = self.index;

        return board_object;
    }
}
