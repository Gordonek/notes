let notesCount = 0;
let activeEditMode = 0;
let input = document.getElementById("note");
input.addEventListener("focus", function(){
    if(activeEditMode==1){
        endEditMode(lastID);
    }
});
input.addEventListener("keydown", function(event){
    let formSpan = document.querySelector(".form span");
    setTimeout(showMiniText,0.1);
    if(event.key === 'Enter'){
        addNote();
        input.value = "";
        formSpan.style.visibility = "hidden";
    }
})
function showMiniText(){
    let formSpan = document.querySelector(".form span");
    let inputValue = input.value;
    if(inputValue != ""){
        formSpan.style.visibility = "visible";
    }
    else{
        formSpan.style.visibility = "hidden";
    }
}
function addNote(){
    let notesNumber = document.getElementById("number");
    let notesContainer = document.querySelector(".notes");
    let note = document.getElementById('note').value.trim();
    let noteContainer = document.createElement('div');
    let span = document.createElement('span');
    let p = document.createElement('p');
    let editContainer = document.createElement("div");
    let img1 = document.createElement("img");
    let img2 = document.createElement("img");
    let wordsNumber = document.createElement("div");
    let wordsCounter = note.split(/\s+/).length;
    if(note != ""){
        notesCount++;
        notesNumber.innerHTML = notesCount;
        noteContainer.classList.add("note");
        noteContainer.setAttribute("id", "note"+notesCount)
        span.innerHTML = notesCount+".";
        p.innerText = note;
        editContainer.classList.add("edit");
        img1.classList.add("trash");
        img1.setAttribute("src","media/trash.svg")
        img1.setAttribute("onclick", "deleteNote('note"+notesCount+"')");
        img2.classList.add("pencil");
        img2.setAttribute("src","media/pencil.svg")
        img2.setAttribute("onclick", "editNote('note"+notesCount+"')");
        wordsNumber.innerText = wordsCounter;
        wordsNumber.classList.add("wordsNumber");
        editContainer.appendChild(img1);
        editContainer.appendChild(img2);
        noteContainer.appendChild(editContainer);
        noteContainer.appendChild(span);
        noteContainer.appendChild(p);
        noteContainer.appendChild(wordsNumber);
        notesContainer.appendChild(noteContainer);
    }
}
function deleteNote(id){
    let notesNumber = document.getElementById("number");
    let note = document.getElementById(id);
    note.remove();
    notesCount--;
    notesNumber.innerHTML = notesCount;
    repairNotesOrder();
}
let lastID = "";
function editNote(id){
    let note = document.getElementById(id);
    if(activeEditMode==0){
        let p = document.querySelector("#"+id+" p");
        let text = p.textContent;
        let textarea = document.createElement("textarea");
        let height = p.clientHeight;
        let textLength = textarea.value.length;
        let wordsNumber = document.querySelector(".wordsNumber");
        p.remove();
        wordsNumber.remove();
        textarea.style.height = height+"px";
        textarea.value = text;
        note.appendChild(textarea);
        textarea.focus();
        textarea.selectionStart = textLength-1;
        textarea.selectionEnd = textLength-1;
        activeEditMode=1;
        lastID = id;
        textarea.addEventListener("keydown", function(event){
            if(event.key === 'Enter'){
                endEditMode(id);
            }
        })
    }
    else{
        if(lastID==id){
            endEditMode(id);
        }
        else{
            endEditMode(lastID);
            editNote(id);
        }
    }
}
function endEditMode(id){
    let note = document.getElementById(id);
    let textarea = document.querySelector("#"+id+" textarea");
    let text = textarea.value.trim();
    let p = document.createElement("p");
    let wordsNumber = document.createElement("div");
    let wordsCounter = text.split(/\s+/).length;
    wordsNumber.innerText = wordsCounter;
    wordsNumber.classList.add("wordsNumber");
    textarea.remove();
    p.innerText = text;
    note.appendChild(p);
    note.appendChild(wordsNumber)
    activeEditMode=0;
}
function repairNotesOrder(){
    let notesArray = document.querySelectorAll(".note");
    let noteNumbersArray = document.querySelectorAll(".note span");
    let img1Array = document.querySelectorAll(".trash");
    let img2Array = document.querySelectorAll(".pencil");
    notesArray.forEach(function(item,index){
        noteNumbersArray[index].innerHTML = (index+1)+".";
        notesArray[index].setAttribute("id","note"+(index+1));
        img1Array[index].setAttribute("onclick", "deleteNote('note"+(index+1)+"')");
        img2Array[index].setAttribute("onclick", "editNote('note"+(index+1)+"')");
    });
}