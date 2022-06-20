let myLeads = [];
const inputEl = document.querySelector('#input-el');
const saveBtn = document.querySelector('#save-btn');
const inputsUlEl = document.querySelector('#inputs-ul');
const delBtn = document.querySelector('#del-btn');
const myLeadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
const tabBtn = document.querySelector('#tab-btn');
if(myLeadsFromLocalStorage){
    myLeads=myLeadsFromLocalStorage
    render(myLeads);
}


saveBtn.addEventListener('click', () => {
    myLeads.push(inputEl.value);
    inputEl.value = '';
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);    
});

function render(myLeads){
    let listItems = '';
    for(i=0;i<myLeads.length;i++){
        listItems += `
        <li>
            <a href= ${myLeads[i]} target='_blank'>
                ${myLeads[i]}
            </a>
        </li>`;
    }
    inputsUlEl.innerHTML = listItems;  
}

delBtn.addEventListener('dblclick', () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});
tabBtn.addEventListener('click', () => {
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    //     myLeads.push(tabs[0].url);
    //     localStorage.setItem('myLeads', JSON.stringify(myLeads));
    //     render(myLeads);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads) );
            render(myLeads);
        })
    // });
});



