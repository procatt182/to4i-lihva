function sendToDiscord() {
    const webhookURL = "https://discord.com/api/webhooks/1340769269205569566/kCY_HXkc_JtTC7dWjC_1RzOf_7PY62PU58Pvh2IKbG2ZsuzT2bx3S8jmoVWcv_kb4ILB";
    const name = document.getElementById("ime").value;
    const number = document.getElementById('number').value;
    let amount = parseFloat(document.getElementById("amount").value);
    
    if (!name || isNaN(amount)) {
        alert("napishi neshto ve pedal.");
        return;
    }

    const newAmount = amount * 1.1;
    const numberToSend = number.trim() === "" ? "Няма номер" : number;

    let segashna_data = new Date();
    let sro4na_data = new Date();
    sro4na_data.setDate(segashna_data.getDate() + 7);
    let data = (sro4na_data.getMonth() + 1).toString().padStart(2, '0') + "/" + sro4na_data.getDate().toString().padStart(2, '0') + "/" + sro4na_data.getFullYear();

    const payload = {
        content: `**кредит на ${name}**\n**Име:** ${name}\n**Номер:** ${numberToSend}\n**Сума:** ${newAmount.toFixed(2)} лв\n**Срок:** ${data}\n----------------------------------------------------`
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
