let itemJsonArray = [];
function getAndupdate() {
    console.log("Updating list....");
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;

    if ((tit === "") || (desc === "")) {
        if (tit === "" && desc != "") {
            alert("Title is Empty.")
        }
        else if (desc === "" && tit != "") {
            alert("Description is Empty.")
        }
        else {
            alert("Title and Description is Empty.")
        }
        return;
    }

    if (localStorage.getItem('itemJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
    }
    else {
        let itemJsonArrayStr = localStorage.getItem('itemJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
    }

    update();
}
function update() {
    if (localStorage.getItem('itemJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
    }
    else {
        let itemJsonArrayStr = localStorage.getItem('itemJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    //Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";

    itemJsonArray.forEach((element, index) => {
        str += `
                
                <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${element[0]}</td>
                        <td>${element[1]}</td>
                        <td><button class="btn-1" onclick= "deleted(${index})">Delete</button></td>
                    </tr>`;
    });
    tableBody.innerHTML = str;

};


document.getElementById("add").addEventListener("click", getAndupdate);
update();

function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    //Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
    update();
}
function clearStorage() {
    console.log('Clearing the storage');
    localStorage.clear();
    update();
}
