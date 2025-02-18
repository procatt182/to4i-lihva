// 🔥 Firebase Configuration (Replace with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyDiJKMgGsDl03I_NA57m9YqzTnvpLvqThQ",
    authDomain: "just-a-test-3dccf.firebaseapp.com",
    databaseURL: "https://just-a-test-3dccf-default-rtdb.firebaseio.com",
    projectId: "just-a-test-3dccf",
    storageBucket: "just-a-test-3dccf.firebasestorage.app",
    messagingSenderId: "262520681133",
    appId: "1:262520681133:web:8f1aea2c01e0ba3d920c24"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ✅ Function to Add Data with 15% Interest
function addData() {
    const ime = document.getElementById("ime").value;
    const number = document.getElementById("number").value;
    let amount = document.getElementById("amount").value;
    
    if (ime.trim() === "" || amount.trim() === "") {
        alert("Моля, въведете поне име и сума.");
        return;
    }

    amount = parseFloat(amount);
    if (isNaN(amount)) {
        alert("Моля, въведете валидна сума.");
        return;
    }

    amount = amount * 1.15; // Adds 15% interest
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    const formattedDueDate = dueDate.toLocaleDateString("en-US");

    const newDataRef = database.ref("krediti").push();
    newDataRef.set({ 
        ime, 
        number: number || "Няма номер", 
        amount, 
        dueDate: formattedDueDate 
    }).then(() => {
        retrieveData(); // Refresh list
    });

    // Clear inputs after submitting
    document.getElementById("ime").value = "";
    document.getElementById("number").value = "";
    document.getElementById("amount").value = "";
}

// ✅ Function to Retrieve Data from Firebase
function retrieveData() {
    const dataList = document.getElementById("dataList");
    dataList.innerHTML = ""; // Clear old list

    database.ref("krediti").once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const key = childSnapshot.key;
            const data = childSnapshot.val();
            
            const li = document.createElement("li");
            li.innerHTML = `
                <div>
                    <strong>Име:</strong> ${data.ime}<br>
                    <strong>Номер:</strong> ${data.number || "Няма номер"}<br>
                    <strong>Сума:</strong> ${data.amount.toFixed(2)} лв<br>
                    <strong>Дата на падеж:</strong> ${data.dueDate}
                </div>
                <button class="delete-btn" onclick="deleteData('${key}')">❌</button>
            `;
            dataList.appendChild(li);
        });
    });
}

// ✅ Function to Delete Specific Data
function deleteData(key) {
    database.ref("krediti/" + key).remove().then(() => {
        retrieveData(); // Refresh list after delete
    });
}

// Load data on page load
retrieveData();