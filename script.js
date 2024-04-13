// Retrieve DOM elements by using getElementById
const taxForm = document.getElementById('taxForm');
const incomeField = document.getElementById('income');
const extraIncomeField = document.getElementById('extraIncome');
const deductionsField = document.getElementById('deductions');
const ageGroupInputField = document.getElementById('ageGroupInput'); 
const incomeErrorIcon = document.getElementById('incomeErrorIcon');
const extraIncomeErrorIcon = document.getElementById('extraIncomeErrorIcon');
const deductionsErrorIcon = document.getElementById('deductionsErrorIcon');
const ageGroupErrorIcon = document.getElementById('ageGroupErrorIcon');
const resultModal = document.getElementById('resultModal');
const closeModal = document.getElementById('closeModal');
const resultsText = document.getElementById('results');

// Utility functions for error icon
function showErrorIcon(icon) {
    icon.style.display = 'inline';
}
function hideErrorIcon(icon) {
    icon.style.display = 'none';
}


// Function to validate the age group input field
function validateAgeGroup() {
    const ageValue = parseInt(ageGroupInput.value.trim(), 10);
    const isValid = !isNaN(ageValue) && ageValue >= 0 && ageValue<150;
    if (ageGroupInput.value.trim()=='') {
        // Display error icon if age input blank
        ageGroupErrorIcon.style.display = 'inline';
        ageGroupErrorIcon.title = 'Input field is mandatory';
    }else if (!isValid) {
        // Display error icon if age input is not valid
        ageGroupErrorIcon.style.display = 'inline';
        ageGroupErrorIcon.title = 'Enter a valid age';
    } 
     else {
        // Hide error icon if age input is valid
        ageGroupErrorIcon.style.display = 'none';
    }
    return isValid;
}


// Function to validate a number field and display an error icon if invalid
function validateNumberField(field, icon) {
    const value = field.value.trim();
    const isValid = /^\d*\.?\d*$/.test(value);
    if (!isValid) {
        // Display the error icon for incorrect input and set the tooltip message
        icon.style.display = 'inline';
        icon.title = 'Please enter number only';
    } 
    else if(value==''){
        // Display the error icon for blank input and set the tooltip message
        icon.style.display = 'inline';
        icon.title = 'Input field is mandatory';
    }
    else {
        // Hide the error icon
        icon.style.display = 'none';
        return isValid;
    }
}

// Function to calculate tax based on provided age
function calculateTax(income, extraIncome, deductions, age) {
    const totalIncome = parseFloat(income) + parseFloat(extraIncome) - parseFloat(deductions);
    const incomeOver8Lakhs = totalIncome - 800000;
    let taxRate = 0;
    if (incomeOver8Lakhs <= 0) {
        return 0; // No tax
    }
    if (age < 40) {
        taxRate = 0.3; 
    } else if (age >= 40 && age < 60) {
        taxRate = 0.4; 
    } else {
        taxRate = 0.1; 
    }
    const tax = incomeOver8Lakhs * taxRate;
    return tax.toFixed(2);
}

// Event handler for form submission
taxForm.addEventListener('submit', function (event) {
    event.preventDefault(); 
    // Validate the form fields
    const isIncomeValid = validateNumberField(incomeField, incomeErrorIcon);
    const isExtraIncomeValid = validateNumberField(extraIncomeField, extraIncomeErrorIcon);
    const isDeductionsValid = validateNumberField(deductionsField, deductionsErrorIcon);
    const isAgeGroupValidicon = validateNumberField(ageGroupInputField,ageGroupErrorIcon);
    const isAgeGroupValid = validateAgeGroup(ageGroupInputField,ageGroupErrorIcon);
    // If all fields are valid, calculate the tax
    if (isIncomeValid && isExtraIncomeValid && isDeductionsValid && isAgeGroupValidicon && isAgeGroupValid) {
        const income = parseFloat(incomeField.value.trim());
        const extraIncome = parseFloat(extraIncomeField.value.trim());
        const deductions = parseFloat(deductionsField.value.trim());
        const ageGroup =parseInt(ageGroupInput.value.trim(), 10);
        const tax = calculateTax(income, extraIncome, deductions, ageGroup);
        // Here display the calculated tax in the modal
        resultsText.innerHTML = `<h2>Your overall income will be</h2><h3>${(income + extraIncome - deductions - tax).toLocaleString()}</h3><h4>after tax deduction</h4>`;
        // Showing the modal with the results
        resultModal.style.display = 'flex';
        resultModal.style.height = '400px';
        resultModal.style.width = '400px';
        resultModal.style.alignItems = 'center';
        resultModal.style.justifyContent = 'center';
    }
});

// Event handler for closing the modal
closeModal.addEventListener('click', function () {
    resultModal.style.display = 'none';
});



