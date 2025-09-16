// ===== COUNTER FUNCTIONALITY =====
// This section handles the counter feature with increment, decrement, and reset buttons
const counterValue = document.getElementById('counterValue');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

let count = 0;

function updateCounter() {
    counterValue.textContent = count;
    // Change color based on value
    if (count > 0) {
        counterValue.style.color = '#2ecc71';
    } else if (count < 0) {
        counterValue.style.color = '#e74c3c';
    } else {
        counterValue.style.color = 'var(--primary-color)';
    }
}

incrementBtn.addEventListener('click', () => {
    count++;
    updateCounter();
});

decrementBtn.addEventListener('click', () => {
    count--;
    updateCounter();
});

resetBtn.addEventListener('click', () => {
    count = 0;
    updateCounter();
});

// ===== THEME SWITCHER FUNCTIONALITY =====
// This section handles changing the color theme of the page
const themeButtons = document.querySelectorAll('.theme-btn');
const resetThemeBtn = document.getElementById('resetTheme');

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        document.body.className = '';
        if (theme !== 'default') {
            document.body.classList.add(`${theme}-theme`);
        }
    });
});

resetThemeBtn.addEventListener('click', () => {
    document.body.className = '';
});

// ===== INTERACTIVE LIST FUNCTIONALITY =====
// This section handles adding and removing items from a list
const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const itemList = document.getElementById('itemList');

function addListItem() {
    const itemText = itemInput.value.trim();
    if (itemText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${itemText}</span>
            <button class="delete-btn">Delete</button>
        `;
        itemList.appendChild(li);
        itemInput.value = '';
        
        // Add event to delete button
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                li.remove();
            }, 300);
        });
    }
}

addItemBtn.addEventListener('click', addListItem);

itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addListItem();
    }
});

// ===== MODAL FUNCTIONALITY =====
// This section handles showing and hiding a modal dialog
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
    }
});

// ===== FORM VALIDATION FUNCTIONALITY =====
// This section handles form validation for the registration form
const form = document.getElementById('registration-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameGroup = document.getElementById('name-group');
const emailGroup = document.getElementById('email-group');
const passwordGroup = document.getElementById('password-group');
const formMessage = document.getElementById('form-message');

// Validate name field
nameInput.addEventListener('blur', function() {
    if (validateName(nameInput.value)) {
        setSuccess(nameGroup);
    } else {
        setError(nameGroup, 'Please enter a valid name (min 2 characters)');
    }
});

// Validate email field
emailInput.addEventListener('blur', function() {
    if (validateEmail(emailInput.value)) {
        setSuccess(emailGroup);
    } else {
        setError(emailGroup, 'Please enter a valid email address');
    }
});

// Validate password field
passwordInput.addEventListener('blur', function() {
    if (validatePassword(passwordInput.value)) {
        setSuccess(passwordGroup);
    } else {
        setError(passwordGroup, 'Password must be at least 8 characters with uppercase, lowercase, and number');
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isNameValid = validateName(nameInput.value);
    let isEmailValid = validateEmail(emailInput.value);
    let isPasswordValid = validatePassword(passwordInput.value);
    
    if (isNameValid && isEmailValid && isPasswordValid) {
        formMessage.textContent = 'Registration successful!';
        formMessage.className = 'success';
        form.reset();
        nameGroup.className = 'form-group';
        emailGroup.className = 'form-group';
        passwordGroup.className = 'form-group';
    } else {
        formMessage.textContent = 'Please fix the errors above.';
        formMessage.className = 'error';
        
        if (!isNameValid) {
            setError(nameGroup, 'Please enter a valid name (min 2 characters)');
        }
        
        if (!isEmailValid) {
            setError(emailGroup, 'Please enter a valid email address');
        }
        
        if (!isPasswordValid) {
            setError(passwordGroup, 'Password must be at least 8 characters with uppercase, lowercase, and number');
        }
    }
});

// Validation functions
function validateName(name) {
    return name.length >= 2;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // At least 8 characters, one uppercase, one lowercase, one number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
}

function setError(element, message) {
    const errorDisplay = element.querySelector('.error');
    errorDisplay.innerText = message;
    element.className = 'form-group error';
}

function setSuccess(element) {
    element.className = 'form-group success';
}

// Add some initial items to the list
const initialItems = ['JavaScript', 'HTML', 'CSS', 'Web Development'];
initialItems.forEach(item => {
    itemInput.value = item;
    addListItem();
});