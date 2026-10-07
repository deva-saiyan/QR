
const serviceInfo = {

    health: {
        title: "Health Insurance",
        icon: "🏥",
        description:
            "Protect yourself and your family with suitable health coverage."
    },

    life: {
        title: "Life Insurance",
        icon: "❤️",
        description:
            "Secure your family's financial future."
    },

    motor: {
        title: "Motor Insurance",
        icon: "🚗",
        description:
            "Get insurance support for your vehicle."
    },

    mutual: {
        title: "Mutual Funds",
        icon: "📈",
        description:
            "Start investing towards your financial goals."
    },

    consultancy: {
        title: "Consultancy",
        icon: "💼",
        description:
            "Get professional career and consultancy guidance."
    },

    legal: {
        title: "Legal Advice",
        icon: "⚖️",
        description:
            "Discuss your legal requirements with our team."
    }

};


/* =========================================
   OPEN SERVICE FORM
========================================= */

function openForm(service) {

    const info = serviceInfo[service];

    if (!info) {
        return;
    }

    // Hide services section
    document.getElementById("services")
        .classList.add("hidden");

    // Show form section
    document.getElementById("formSection")
        .classList.remove("hidden");

    // Update form header
    document.getElementById("formTitle")
        .textContent = info.title;

    document.getElementById("formDescription")
        .textContent = info.description;

    document.getElementById("formIcon")
        .textContent = info.icon;

    document.getElementById("serviceType")
        .value = info.title;


    // Hide all service forms
    document.querySelectorAll(".service-form")
        .forEach(form => {
            form.classList.add("hidden");
        });


    // Show selected service form
    const selectedForm =
        document.getElementById(service + "Form");

    if (selectedForm) {
        selectedForm.classList.remove("hidden");
    }


    // Scroll to form
    document.getElementById("formSection")
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
}


/* =========================================
   CLOSE FORM
========================================= */

function closeForm() {

    document.getElementById("formSection")
        .classList.add("hidden");

    document.getElementById("services")
        .classList.remove("hidden");

    document.getElementById("services")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================================
   DYNAMIC CHILD FIELDS
========================================= */

function updateChildrenFields() {

    const numberOfSons =
        parseInt(
            document.getElementById("numberOfSons").value
        );

    const numberOfDaughters =
        parseInt(
            document.getElementById("numberOfDaughters").value
        );


    const sonContainer =
        document.getElementById("sonFields");

    const daughterContainer =
        document.getElementById("daughterFields");


    /* -------------------------
       SONS
    ------------------------- */

    sonContainer.innerHTML = "";

    for (let i = 1; i <= numberOfSons; i++) {

        const wrapper =
            document.createElement("div");

        wrapper.className = "child-field";

        wrapper.innerHTML = `
            <label for="son${i}Dob">
                Son ${i} - Date of Birth
            </label>

            <input
                type="date"
                id="son${i}Dob"
                name="son${i}Dob"
            >
        `;

        sonContainer.appendChild(wrapper);
    }


    /* -------------------------
       DAUGHTERS
    ------------------------- */

    daughterContainer.innerHTML = "";

    for (let i = 1; i <= numberOfDaughters; i++) {

        const wrapper =
            document.createElement("div");

        wrapper.className = "child-field";

        wrapper.innerHTML = `
            <label for="daughter${i}Dob">
                Daughter ${i} - Date of Birth
            </label>

            <input
                type="date"
                id="daughter${i}Dob"
                name="daughter${i}Dob"
            >
        `;

        daughterContainer.appendChild(wrapper);
    }
}


/* =========================================
   MOBILE NUMBER VALIDATION
========================================= */

function isValidMobile(number) {

    return /^[6-9]\d{9}$/.test(number);
}


/* =========================================
   PINCODE VALIDATION
========================================= */

function isValidPincode(pincode) {

    return /^\d{6}$/.test(pincode);
}


/* =========================================
   FORM VALIDATION
========================================= */

function validateForm(service) {

    let valid = true;


    /* HEALTH */

    if (service === "Health Insurance") {

        const gender =
            document.querySelector(
                'input[name="healthGender"]:checked'
            );

        const dob =
            document.getElementById("healthDob").value;

        const pincode =
            document.getElementById("healthPincode").value.trim();

        const mobile =
            document.getElementById("healthMobile").value.trim();


        if (!gender) {
            alert("Please select your gender.");
            return false;
        }


        if (!dob) {
            alert("Please select your date of birth.");
            return false;
        }


        if (!isValidPincode(pincode)) {
            alert("Please enter a valid 6-digit pincode.");
            return false;
        }


        if (!isValidMobile(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return false;
        }
    }


    /* LIFE */

    if (service === "Life Insurance") {

        const name =
            document.getElementById("lifeName").value.trim();

        const dob =
            document.getElementById("lifeDob").value;

        const mobile =
            document.getElementById("lifeMobile").value.trim();

        const coverage =
            document.getElementById("coverage").value;


        if (!name) {
            alert("Please enter your name.");
            return false;
        }

        if (!dob) {
            alert("Please select your date of birth.");
            return false;
        }

        if (!isValidMobile(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return false;
        }

        if (!coverage) {
            alert("Please select expected coverage.");
            return false;
        }
    }


    /* MOTOR */

    if (service === "Motor Insurance") {

        const name =
            document.getElementById("motorName").value.trim();

        const mobile =
            document.getElementById("motorMobile").value.trim();

        const vehicle =
            document.getElementById("vehicleType").value;

        const registration =
            document.getElementById("registrationNumber")
                .value.trim();

        const expiry =
            document.getElementById("policyExpiry").value;


        if (!name) {
            alert("Please enter your name.");
            return false;
        }

        if (!isValidMobile(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return false;
        }

        if (!vehicle) {
            alert("Please select your vehicle type.");
            return false;
        }

        if (!registration) {
            alert("Please enter vehicle registration number.");
            return false;
        }

        if (!expiry) {
            alert("Please select policy expiry date.");
            return false;
        }
    }


    /* MUTUAL FUNDS */

    if (service === "Mutual Funds") {

        const name =
            document.getElementById("mutualName").value.trim();

        const dob =
            document.getElementById("mutualDob").value;

        const mobile =
            document.getElementById("mutualMobile").value.trim();

        const sip =
            document.getElementById("sipAmount").value;

        const goal =
            document.getElementById("investmentGoal").value;


        if (!name) {
            alert("Please enter your name.");
            return false;
        }

        if (!dob) {
            alert("Please select your date of birth.");
            return false;
        }

        if (!isValidMobile(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return false;
        }

        if (!sip) {
            alert("Please select your monthly SIP amount.");
            return false;
        }

        if (!goal) {
            alert("Please select your investment goal.");
            return false;
        }
    }


    /* CONSULTANCY */

    if (service === "Consultancy") {

        const name =
            document.getElementById("consultName").value.trim();

        const mobile =
            document.getElementById("consultMobile").value.trim();

        const profession =
            document.getElementById("profession").value;


        if (!name) {
            alert("Please enter your name.");
            return false;
        }

        if (!isValidMobile(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return false;
        }

        if (!profession) {
            alert("Please select your profession.");
            return false;
        }
    }


    /* LEGAL */

    if (service === "Legal Advice") {

        const name =
            document.getElementById("legalName").value.trim();

        const mobile =
            document.getElementById("legalMobile").value.trim();

        const requirement =
            document.getElementById("legalRequirement").value;

        const description =
            document.getElementById("legalDescription")
                .value.trim();


        if (!name) {
            alert("Please enter your name.");
            return false;
        }

        if (!isValidMobile(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return false;
        }

        if (!requirement) {
            alert("Please select your legal requirement.");
            return false;
        }

        if (!description) {
            alert("Please briefly explain your requirement.");
            return false;
        }
    }


    return valid;
}


/* =========================================
   FORM SUBMISSION
========================================= */

document.getElementById("enquiryForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const service =
            document.getElementById("serviceType").value;


        // Validate
        if (!validateForm(service)) {
            return;
        }


        /*
         * FRONTEND ONLY
         *
         * No database or server is connected here.
         * Later this section can send the form
         * data to Google Forms, Formspree,
         * Google Apps Script, Django, etc.
         */


        console.log(
            "Enquiry submitted:",
            service
        );


        // Show success popup
        document.getElementById("successModal")
            .classList.remove("hidden");


        // Reset form
        this.reset();


        // Reset dynamic child fields
        document.getElementById("sonFields")
            .innerHTML = "";

        document.getElementById("daughterFields")
            .innerHTML = "";

        document.getElementById("numberOfSons")
            .value = "0";

        document.getElementById("numberOfDaughters")
            .value = "0";

    });


/* =========================================
   SUCCESS MODAL
========================================= */

function closeSuccessModal() {

    document.getElementById("successModal")
        .classList.add("hidden");

    closeForm();
}


/* =========================================
   INPUT RESTRICTIONS
========================================= */

document.addEventListener("input", function (event) {

    const target = event.target;


    // Mobile number
    if (target.type === "tel") {

        target.value =
            target.value.replace(/\D/g, "")
                .slice(0, 10);
    }


    // Pincode
    if (target.id === "healthPincode") {

        target.value =
            target.value.replace(/\D/g, "")
                .slice(0, 6);
    }


    // Vehicle registration
    if (target.id === "registrationNumber") {

        target.value =
            target.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "");
    }

});


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    updateChildrenFields();

});
