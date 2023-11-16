// task1
let blockX = document.getElementById('block-x');
let blockY = document.getElementById('block-y');
[blockX.innerHTML, blockY.innerHTML] = [blockY.innerHTML, blockX.innerHTML];

// task2
let length = 125;
let width = 12;
let area = length * width;
document.getElementById('block-4').innerHTML += `<br><br>Rectangle Area: ${area}`;

// task3
let calculateMinMax = () => {
    let numbersInput = document.getElementById('numbersInput').value;
    if (numbersInput == '') {
        alert("Enter numbers");
        return;
    }
    let numbersArray = numbersInput.split(',').map(Number);
    let minNumber = Math.min(...numbersArray);
    let maxNumber = Math.max(...numbersArray);

    if (numbersArray.some(isNaN)) {
        alert('Enter valid, comma-separated numbers');
        return;
    }

    document.cookie = `minNumber=${minNumber}`;
    document.cookie = `maxNumber=${maxNumber}`;

    alert(`Min Number: ${minNumber}\nMax Number: ${maxNumber}`);
}

let minNumberCookie = getCookie('minNumber');
let maxNumberCookie = getCookie('maxNumber');

if (minNumberCookie && maxNumberCookie) {
    alert(`Min Number: ${minNumberCookie}\nMax Number: ${maxNumberCookie}`);

    let userDecision = confirm('Do you want to keep the saved data?');
    if (!userDecision) {
        deleteCookies();
        // location.reload(true);
    } else {
        alert('Cookies are enabled. To change, reload the page.');
        document.getElementById('numbersForm').style.display = 'none';
    }
}

function getCookie(cookieName) {
    let name = `${cookieName}=`;
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

function deleteCookies() {
    document.cookie = 'minNumber=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'maxNumber=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
}


// task4
let boldCheckbox = document.getElementById('boldCheckbox');
let boldText = document.getElementById('boldText');

boldCheckbox.addEventListener('change', () => {
    boldText.style.fontWeight = boldCheckbox.checked ? 'bold' : 'normal';
    localStorage.setItem('boldText', boldCheckbox.checked);
});

let storedBoldValue = localStorage.getItem('boldText');
if (storedBoldValue) {
    boldCheckbox.checked = JSON.parse(storedBoldValue);
    boldText.style.fontWeight = boldCheckbox.checked ? 'bold' : 'normal';
}

// task5

function showForm(targetId) {
    let formHTML = `
                <form id="tableForm">
                    <label for="tableForm">Enter items (separated with Enter):</label>
                    <textarea name="" cols="40" rows="5"></textarea>
                    <button type="button" onclick="createTable('${targetId}')">Create Table</button>
                </form>                
            `;


    document.querySelector(`#${targetId} #tableImage`).style.display = 'none';
    document.getElementById(targetId).innerHTML += formHTML;


}

function createTable(targetId) {
    let textInput = document.querySelector(`#${targetId} textarea`);
    let rowsArray = textInput.value.split('\n');
    saveTableData(targetId, textInput.value);
    displayTable(targetId, rowsArray)
    document.querySelector(`#${parentBlockId} #tableForm`).remove()
}


function saveTableData(parentBlockId, data) {
    localStorage.setItem(parentBlockId, data);
}


function displayTable(parentBlockId, tableData) {

    document.getElementById(parentBlockId).innerHTML = '<table id="dataTable"></table>'
    let table = document.querySelector(`#${parentBlockId} #dataTable`);


    for (let i = 0; i < tableData.length; i++) {
        let row = table.insertRow();
        let cell = row.insertCell(0);
        cell.textContent = tableData[i];
    }
    document.getElementById(parentBlockId).innerHTML += `<button type="button" id="delateTableButton" onclick="deleteTable('${parentBlockId} ')">Delete all tables</button>`;

}

function deleteTable(parentBlockId) {
    document.querySelector(`#${parentBlockId} #dataTable`).remove();
    document.querySelector(`#${parentBlockId} #delateTableButton`).remove();

    console.log(parentBlockId);
    for (let i = 1; i < 7; i++) {
        localStorage.removeItem(`block-${i}`);
        location.reload()

    }
}





function loadTableData() {
    for (let i = 1; i < 7; i++) {
        let storedTableData = localStorage.getItem(`block-${i}`);
        if (storedTableData) {
            displayTable(`block-${i}`, storedTableData.split('\n'));
        }

    }

}


loadTableData();