/* ==========================================================
   AJ KALAI ASSOCIATES
   Custom HTML Forms
   → Google Forms
   → Google Sheets
   ========================================================== */


/* ==========================================================
   GOOGLE FORM CONFIGURATION
   ========================================================== */

const GOOGLE_FORMS = {

    /* ======================================================
       HEALTH INSURANCE
       ====================================================== */

    health: {
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdGmQ5HoBpfvFnlUL6tk7Z1yZHZLXMk6DC00fY96E33LO5urg/formResponse",

        fields: {
            name: "entry.1449005772",
            gender: "entry.1685270148",
            selfDob: "entry.1960516808",
            spouseDob: "entry.1842912509",

            // Child DOB IDs were not present in the
            // pre-filled link, so leave them unmapped for now.

            son1Dob: null,
            son2Dob: null,
            daughter1Dob: null,
            daughter2Dob: null,

            pincode: "entry.628104915",
            mobile: "entry.1120204368"
        }
    },


    /* ======================================================
       LIFE INSURANCE
       ====================================================== */

    life: {
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdyURwpoQ4Nn3r9dgImEcO1jv29hTddqVZI6HoagbwaBfglMg/formResponse",

        fields: {
            name: "entry.726004286",
            dob: "entry.959984559",
            mobile: "entry.393130259",
            coverage: "entry.1906449228"
        }
    },


    /* ======================================================
       MOTOR INSURANCE
       ====================================================== */

    motor: {
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdP4KZEscQvUlVAPLKjFY6HY3a1V--HfzHsUlsS0iFUDqP4Yw/formResponse",

        fields: {
            name: "entry.2092238618",
            mobile: "entry.1556369182",
            vehicleType: "entry.479301265",
            registration: "entry.1753222212",
            expiry: "entry.588393791"
        }
    },


    /* ======================================================
       MUTUAL FUNDS
       ====================================================== */

    mutual: {
        url: "https://docs.google.com/forms/d/e/1FAIpQLScUTTCKMWgisguRU9e-Nb6DirDVIWrT9nTKwEeSKJy1PegEbw/formResponse",

        fields: {
            name: "entry.1213373070",
            dob: "entry.1869690058",
            mobile: "entry.952409558",
            sip: "entry.1717212747",
            goal: "entry.1522553132"
        }
    },


    /* ======================================================
       CONSULTANCY
       ====================================================== */

    consultancy: {
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdGZYaCWHSuib-wKq8QTNcblN8P4wzXtRWjPovbu2xE_sLXUQ/formResponse",

        fields: {
            name: "entry.1000057",
            mobile: "entry.1000027",
            profession: "entry.967112212"
        }
    },


    /* ======================================================
       LEGAL ADVICE
       ====================================================== */

    legal: {
        url: "https://docs.google.com/forms/d/e/1FAIpQLSf6-cgMAAHDJnMx8ccGXKSVlqukIwiIsacK4LcQPefzGzMkVA/formResponse",

        fields: {
            name: "entry.559352220",
            mobile: "entry.877086558",
            requirement: "entry.924523986",
            description: "entry.186230675"
        }
    }

};


/* ==========================================================
   HEALTH INSURANCE
   DYNAMIC CHILD FIELDS
   ========================================================== */

function updateChildrenFields(type) {

    const countElement = document.getElementById(
        type === "son" ? "sonCount" : "daughterCount"
    );

    const container = document.getElementById(
        type === "son" ? "sonFields" : "daughterFields"
    );

    if (!countElement || !container) {
        return;
    }

    const count = parseInt(
        countElement.value || "0",
        10
    );

    container.innerHTML = "";

    for (let i = 1; i <= count; i++) {

        const wrapper = document.createElement("div");

        wrapper.className = "form-group";

        wrapper.innerHTML = `
            <label>
                ${type === "son" ? "Son" : "Daughter"} ${i} DOB
            </label>

            <input
                type="date"
                name="${type}${i}Dob"
            >
        `;

        container.appendChild(wrapper);
    }
}


/* ==========================================================
   VALIDATION
   ========================================================== */

function validateMobile(mobile) {

    return /^[6-9]\d{9}$/.test(
        mobile.trim()
    );
}


function validatePincode(pincode) {

    return /^\d{6}$/.test(
        pincode.trim()
    );
}


/* ==========================================================
   CHECK GOOGLE FORM CONFIGURATION
   ========================================================== */

function isGoogleFormConfigured(service) {

    const config = GOOGLE_FORMS[service];

    if (!config) {
        return false;
    }

    if (
        !config.url ||
        !config.url.endsWith("/formResponse")
    ) {
        return false;
    }

    for (const key in config.fields) {

        const fieldId = config.fields[key];

        /*
         * null is allowed for currently unmapped
         * optional health child DOB fields.
         */

        if (fieldId === null) {
            continue;
        }

        if (
            !fieldId ||
            !fieldId.startsWith("entry.")
        ) {
            return false;
        }
    }

    return true;
}


/* ==========================================================
   SUBMIT TO GOOGLE FORM
   ========================================================== */

function submitToGoogleForm(service, formData) {

    const config = GOOGLE_FORMS[service];

    if (!isGoogleFormConfigured(service)) {

        showSuccess(
            "Google Form configuration is incomplete.",
            true
        );

        return false;
    }


    /* ------------------------------------------------------
       Hidden iframe
       ------------------------------------------------------ */

    let iframe =
        document.getElementById(
            "googleFormSubmitFrame"
        );

    if (!iframe) {

        iframe =
            document.createElement("iframe");

        iframe.id =
            "googleFormSubmitFrame";

        iframe.name =
            "googleFormSubmitFrame";

        iframe.style.display =
            "none";

        document.body.appendChild(iframe);
    }


    /* ------------------------------------------------------
       Temporary Google Form
       ------------------------------------------------------ */

    const googleForm =
        document.createElement("form");

    googleForm.method =
        "POST";

    googleForm.action =
        config.url;

    googleForm.target =
        "googleFormSubmitFrame";

    googleForm.style.display =
        "none";


    /* ------------------------------------------------------
       Add Google Form fields
       ------------------------------------------------------ */

    Object.keys(formData).forEach(key => {

        const entryId =
            config.fields[key];

        /*
         * Ignore fields that do not have a Google Form
         * mapping.
         */

        if (!entryId) {
            return;
        }

        const input =
            document.createElement("input");

        input.type =
            "hidden";

        input.name =
            entryId;

        input.value =
            formData[key] ?? "";

        googleForm.appendChild(input);

    });


    document.body.appendChild(
        googleForm
    );


    /* ------------------------------------------------------
       Submit
       ------------------------------------------------------ */

    googleForm.submit();


    /* ------------------------------------------------------
       Remove temporary form
       ------------------------------------------------------ */

    setTimeout(() => {

        googleForm.remove();

    }, 2000);


    return true;
}


/* ==========================================================
   SUCCESS / ERROR MESSAGE
   ========================================================== */

function showSuccess(
    message,
    isError = false
) {

    const messageBox =
        document.getElementById(
            "successMessage"
        );

    if (!messageBox) {

        alert(message);

        return;
    }


    messageBox.textContent =
        message;

    messageBox.style.display =
        "block";


    if (isError) {

        messageBox.classList.add(
            "error"
        );

    } else {

        messageBox.classList.remove(
            "error"
        );
    }
}


/* ==========================================================
   RESET FORM
   ========================================================== */

function resetServiceForm(form) {

    form.reset();


    const sonFields =
        document.getElementById(
            "sonFields"
        );

    const daughterFields =
        document.getElementById(
            "daughterFields"
        );


    if (sonFields) {
        sonFields.innerHTML = "";
    }


    if (daughterFields) {
        daughterFields.innerHTML = "";
    }
}


/* ==========================================================
   MAIN FORM HANDLER
   ========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* --------------------------------------------------
           Show thank-you popup after returning to home page
           -------------------------------------------------- */

        const submittedMessage =
            sessionStorage.getItem("formSubmitted");

        if (submittedMessage) {

            sessionStorage.removeItem("formSubmitted");

            setTimeout(() => {

                alert("🎉 " + submittedMessage);

            }, 300);

        }


        const forms =
            document.querySelectorAll(
                ".service-form"
            );


        forms.forEach(form => {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const service =
                        form.dataset.service;


                    if (!GOOGLE_FORMS[service]) {

                        showSuccess(
                            "Invalid service configuration.",
                            true
                        );

                        return;
                    }


                    /* --------------------------------------
                       Collect form data
                       -------------------------------------- */

                    const formData = {};


                    const inputs =
                        form.querySelectorAll(
                            "input, select, textarea"
                        );


                    inputs.forEach(input => {

                        if (!input.name) {
                            return;
                        }


                        if (
                            input.type === "radio" &&
                            !input.checked
                        ) {
                            return;
                        }


                        if (
                            input.type === "checkbox" &&
                            !input.checked
                        ) {
                            return;
                        }


                        formData[input.name] =
                            input.value.trim();

                    });


                    /* --------------------------------------
                       Mobile validation
                       -------------------------------------- */

                    if (formData.mobile) {

                        if (
                            !validateMobile(
                                formData.mobile
                            )
                        ) {

                            showSuccess(
                                "Please enter a valid 10-digit mobile number.",
                                true
                            );

                            return;
                        }
                    }


                    /* --------------------------------------
                       Pincode validation
                       -------------------------------------- */

                    if (formData.pincode) {

                        if (
                            !validatePincode(
                                formData.pincode
                            )
                        ) {

                            showSuccess(
                                "Please enter a valid 6-digit pincode.",
                                true
                            );

                            return;
                        }
                    }


                    /* --------------------------------------
                       Submit
                       -------------------------------------- */

                    const submitted =
                        submitToGoogleForm(
                            service,
                            formData
                        );


                    if (!submitted) {
                        return;
                    }


                    /* --------------------------------------
                       Submit successful
                       -------------------------------------- */

                    setTimeout(() => {

                        // Save message for home page
                        sessionStorage.setItem(
                            "formSubmitted",
                            "Thank you! Your form has been submitted successfully."
                        );

                        // Go back to home page
                        window.location.href =
                            "index.html";

                    }, 1000);

                }
            );

        });


        /* ==================================================
           HEALTH - SON COUNT
           ================================================== */

        const sonCount =
            document.getElementById(
                "sonCount"
            );


        if (sonCount) {

            sonCount.addEventListener(
                "change",
                function () {

                    updateChildrenFields(
                        "son"
                    );

                }
            );

        }


        /* ==================================================
           HEALTH - DAUGHTER COUNT
           ================================================== */

        const daughterCount =
            document.getElementById(
                "daughterCount"
            );


        if (daughterCount) {

            daughterCount.addEventListener(
                "change",
                function () {

                    updateChildrenFields(
                        "daughter"
                    );

                }
            );

        }


        /* ==================================================
           MOBILE INPUT
           ================================================== */

        document
            .querySelectorAll(
                'input[name="mobile"]'
            )
            .forEach(input => {

                input.addEventListener(
                    "input",
                    function () {

                        this.value =
                            this.value
                                .replace(/\D/g, "")
                                .slice(0, 10);

                    }
                );

            });


        /* ==================================================
           PINCODE INPUT
           ================================================== */

        document
            .querySelectorAll(
                'input[name="pincode"]'
            )
            .forEach(input => {

                input.addEventListener(
                    "input",
                    function () {

                        this.value =
                            this.value
                                .replace(/\D/g, "")
                                .slice(0, 6);

                    }
                );

            });

    }
);