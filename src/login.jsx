function Login(){
    return(
        <>
        <div>

        </div>
        </>
    );
}
export default Login;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const loginData = { uid, password };

    try {
        // Send the login data to the server
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        // Check if the response is okay
        if (response.ok) {
            const result = await response.json();

            // Redirect to dashboard if login is successful
            window.location.href = '../Main Dashboard/dashboard.html';
        } else {
            const errorResult = await response.json();
            alert(errorResult.message || "Login failed!");
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred, please try again later.');
    }

    // Prevent default form submission
    return false;

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', login);