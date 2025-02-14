function sendToDiscord() {
    const webhookURL = "https://discord.com/api/webhooks/1339929906489987134/21uRpsYRpZeyHF-vBzQqTzWosgihRvuSQAPdcCp_WLiz6CPVvXReW7qOxdEZFcOOGoiY";
    const name = document.getElementById("ime").value;
    const amount = document.getElementById("amount").value;
    
    if (!name || !amount) {
        alert("Please fill out all fields.");
        return;
    }
    
    let segashna_data = new Date();
    let sro4na_data = new Date();
    sro4na_data.setDate(segashna_data.getDate() + 7);
    let data = sro4na_data.getDate().toString().padStart(2, '0') + "/" + (sro4na_data.getMonth() + 1).toString().padStart(2, '0') + "/" + sro4na_data.getFullYear();

    const payload = {
        content: `кредит на ${name}\n**Име:** ${name}\n**Сума:** ${amount} лв\n**Срок:** ${data}`
    };
    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(response => {
        if (response.ok) {
            alert("vydeno uspeshno!");
        } else {
            alert("bugna neshto deeba.");
        }
    }).catch(error => {
        alert("maika ti html.");
        console.error(error);
    });
}