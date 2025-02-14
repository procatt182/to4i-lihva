
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value
    
    if ((username.toLowerCase() === 'boris') && (password.toLowerCase() === 'boris12345.' || password.toLowerCase() === 'boris12345.')) {
        
        document.querySelector('.login-container').classList.add('fade-out');
        
        setTimeout(() => {
            document.querySelector('.login-container').style.display = 'none';
            document.querySelector('.container').style.display = 'block';
            
            // Add fade-in effect to the main content
            document.querySelector('.container').classList.add('fade');
        }, 1000);
    } else {
        alert('greshna parola');
    }
}
