const firebaseConfig = {
  apiKey: "AIzaSyDiJKMgGsDl03I_NA57m9YqzTnvpLvqThQ",
  authDomain: "just-a-test-3dccf.firebaseapp.com",
  databaseURL: "https://just-a-test-3dccf-default-rtdb.firebaseio.com",
  projectId: "just-a-test-3dccf",
  storageBucket: "just-a-test-3dccf.firebasestorage.app",
  messagingSenderId: "262520681133",
  appId: "1:262520681133:web:8f1aea2c01e0ba3d920c24"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function addData() {
  const name = document.getElementById("ime").value;
  const number = document.getElementById("number").value;
  let amount = document.getElementById("amount").value;

  if (name.trim() === '' || amount.trim() === '') {
    alert("Моля, въведете поне име и сума.");
    return;
  }

  amount = parseFloat(amount);
  if (isNaN(amount)) {
    alert("Моля, въведете валидна сума.");
    return;
  }

  amount = amount * 1.15;

  const due = new Date();
  due.setDate(due.getDate() + 7);
  const dueDate = due.toLocaleDateString("en-US");

  const newRef = database.ref("krediti").push();
  newRef.set({
    ime: name,
    number: number || "Няма номер",
    amount: amount,
    dueDate: dueDate
  }).then(() => {
    retrieveData();
  });

  document.getElementById("ime").value = '';
  document.getElementById("number").value = '';
  document.getElementById("amount").value = '';
}

function retrieveData() {
  const dataList = document.getElementById("dataList");
  dataList.innerHTML = '';

  database.ref("krediti").once("value", snapshot => {
    snapshot.forEach(child => {
      const id = child.key;
      const data = child.val();

      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>Име:</strong> ${data.ime}<br>
          <strong>Номер:</strong> ${data.number || "Няма номер"}<br>
          <strong>Сума:</strong> ${data.amount.toFixed(2)} лв<br>
          <strong>Срок:</strong> ${data.dueDate}
        </div>
        <button class="delete-btn" onclick="deleteData('${id}')">❌</button>
      `;

      dataList.appendChild(li);
    });
  });
}

function deleteData(id) {
  database.ref("krediti/" + id).remove().then(() => {
    retrieveData();
  });
}

retrieveData();
