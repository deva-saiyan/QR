/* ==========================================================
   AJ KALAI ASSOCIATES
   Custom HTML Forms
   HTML Form
        ↓
   Google Form
        ↓
   Google Sheets

   SERVICES:
   1. Health Insurance
   2. Life Insurance
   3. Motor Insurance
   4. Mutual Funds
   5. Consultancy
   6. Legal Advice

   IMPORTANT:
   Health Insurance contains ONLY:
   - Son Count
   - Daughter Count

   Child DOB fields are completely removed.
   ========================================================== */


/* ==========================================================
   GOOGLE FORM CONFIGURATION
   ========================================================== */

const GOOGLE_FORMS = {

    /* ======================================================
       HEALTH INSURANCE
       ====================================================== */

    health: {

        url:
            "https://docs.google.com/forms/d/e/1FAIpQLSdGmQ5HoBpfvFnlUL6tk7Z1yZHZLXMk6DC00fY96E33LO5urg/formResponse",

        fields: {

            name:
                "entry.1449005772",

            gender:
                "entry.1685270148",

            selfDob:
                "entry.1960516808",

            spouseDob:
                "entry.1842912509",

            sonCount:
                "entry.1693510977",

            daughterCount:
                "entry.262002855",

            pincode:
                "entry.628104915",

            mobile:
                "entry.1120204368"
        }
    },


    /* ======================================================
       LIFE INSURANCE
       ====================================================== */

    life: {

        url:
            "https://docs.google.com/forms/d/e/1FAIpQLSdyURwpoQ4Nn3r9dgImEcO1jv29hTddqVZI6HoagbwaBfglMg/formResponse",

        fields: {

            name:
                "entry.726004286",

            dob:
                "entry.959984559",

            mobile:
                "entry.393130259",

            coverage:
                "entry.1906449228"
        }
    },


    /* ======================================================
       MOTOR INSURANCE
       ====================================================== */

    motor: {

        url:
            "https://docs.google.com/forms/d/e/1FAIpQLSdP4KZEscQvUlVAPLKjFY6HY3a1V--HfzHsUlsS0iFUDqP4Yw/formResponse",

        fields: {

            name:
                "entry.2092238618",

            mobile:
                "entry.1556369182",

            vehicleType:
                "entry.479301265",

            registration:
                "entry.1753222212",

            expiry:
                "entry.588393791"
        }
    },


    /* ======================================================
       MUTUAL FUNDS
       ====================================================== */

    mutual: {

        url:
            "https://docs.google.com/forms/d/e/1FAIpQLScUTTCKMWgisguRU9e-Nb6DirDVIWrT9nTKwEeSKJy1PegEbw/formResponse",

        fields: {

            name:
                "entry.1213373070",

            dob:
                "entry.1869690058",

            mobile:
                "entry.952409558",

            sip:
                "entry.1717212747",

            goal:
                "entry.1522553132"
        }
    },


    /* ======================================================
       CONSULTANCY
       ====================================================== */

    consultancy: {

        url:
            "https://docs.google.com/forms/d/e/1FAIpQLSdGZYaCWHSuib-wKq8QTNcblN8P4wzXtRWjPovbu2xE_sLXUQ/formResponse",

        fields: {

            name:
                "entry.1000057",

            mobile:
                "entry.1000027",

            profession:
                "entry.967112212"
        }
    },


    /* ======================================================
       LEGAL ADVICE
       ====================================================== */

    legal: {

        url:
            "https://docs.google.com/forms/d/e/1FAIpQLSf6-cgMAAHDJnMx8ccGXKSVlqukIwiIsacK4LcQPefzGzMkVA/formResponse",

        fields: {

            name:
                "entry.559352220",

            mobile:
                "entry.877086558",

            requirement:
                "entry.924523986",

            description:
                "entry.186230675"
        }
    }

};


/* ==========================================================
   CONSTANTS
   ========================================================== */

const SUBMISSION_STORAGE_KEY =
    "formSubmitted";

const HOME_PAGE =
    "index.html";


/* ==========================================================
   VALIDATE MOBILE
   ========================================================== */

function validateMobile(mobile) {

    return /^[6-9]\d{9}$/.test(
        String(mobile || "").trim()
    );
}


/* ==========================================================
   VALIDATE PINCODE
   ========================================================== */

function validatePincode(pincode) {

    return /^\d{6}$/.test(
        String(pincode || "").trim()
    );
}


/* ==========================================================
   GOOGLE FORM CONFIGURATION CHECK
   ========================================================== */

function isGoogleFormConfigured(service) {

    const config =
        GOOGLE_FORMS[service];

    if (!config) {
        return false;
    }

    if (
        !config.url ||
        !config.url.endsWith("/formResponse")
    ) {
        return false;
    }

    if (!config.fields) {
        return false;
    }

    for (const key in config.fields) {

        const entryId =
            config.fields[key];

        if (!entryId) {
            return false;
        }

        if (
            !entryId.startsWith("entry.")
        ) {
            return false;
        }
    }

    return true;
}


/* ==========================================================
   CREATE HIDDEN IFRAME
   ========================================================== */

function getGoogleFormIframe() {

    let iframe =
        document.getElementById(
            "googleFormSubmitFrame"
        );

    if (iframe) {
        return iframe;
    }

    iframe =
        document.createElement("iframe");

    iframe.id =
        "googleFormSubmitFrame";

    iframe.name =
        "googleFormSubmitFrame";

    iframe.style.position =
        "fixed";

    iframe.style.width =
        "1px";

    iframe.style.height =
        "1px";

    iframe.style.border =
        "0";

    iframe.style.opacity =
        "0";

    iframe.style.pointerEvents =
        "none";

    document.body.appendChild(
        iframe
    );

    return iframe;
}


/* ==========================================================
   COLLECT FORM DATA
   ========================================================== */

function collectFormData(form) {

    const data = {};

    const elements =
        form.querySelectorAll(
            "input[name], select[name], textarea[name]"
        );

    elements.forEach(element => {

        const name =
            element.name;

        if (!name) {
            return;
        }


        /* Radio button */

        if (
            element.type === "radio"
        ) {

            if (element.checked) {

                data[name] =
                    element.value;
            }

            return;
        }


        /* Checkbox */

        if (
            element.type === "checkbox"
        ) {

            if (element.checked) {

                if (!data[name]) {
                    data[name] = [];
                }

                data[name].push(
                    element.value
                );
            }

            return;
        }


        /* Normal input */

        data[name] =
            element.value;
    });

    return data;
}


/* ==========================================================
   SUBMIT TO GOOGLE FORM
   ========================================================== */

function submitToGoogleForm(
    service,
    formData
) {

    const config =
        GOOGLE_FORMS[service];


    if (
        !isGoogleFormConfigured(
            service
        )
    ) {

        showSuccess(
            "Google Form configuration is incomplete.",
            true
        );

        return false;
    }


    /* Create hidden iframe */

    getGoogleFormIframe();


    /* Temporary form */

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

    googleForm.acceptCharset =
        "UTF-8";


    let fieldCount = 0;


    /* Add Google Form fields */

    Object.keys(formData).forEach(
        key => {

            const entryId =
                config.fields[key];

            if (!entryId) {
                return;
            }


            let value =
                formData[key];


            /* Handle checkbox arrays */

            if (Array.isArray(value)) {

                value =
                    value.join(", ");
            }


            if (
                value === null ||
                value === undefined
            ) {

                value = "";
            }


            const input =
                document.createElement(
                    "input"
                );

            input.type =
                "hidden";

            input.name =
                entryId;

            input.value =
                String(value);


            googleForm.appendChild(
                input
            );

            fieldCount++;
        }
    );


    /* Make sure fields exist */

    if (fieldCount === 0) {

        showSuccess(
            "No Google Form fields are configured.",
            true
        );

        return false;
    }


    document.body.appendChild(
        googleForm
    );


    /* Submit */

    googleForm.submit();


    /*
     * Remove temporary form
     * after submission starts.
     */

    setTimeout(
        () => {

            if (
                googleForm.parentNode
            ) {

                googleForm.remove();
            }

        },
        5000
    );


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
   VALIDATE SERVICE FORM
   ========================================================== */

function validateServiceForm(
    formData
) {


    /* Mobile */

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

            return false;
        }
    }


    /* Pincode */

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

            return false;
        }
    }


    /* Health child count */

    if (
        formData.sonCount !==
        undefined
    ) {

        const sonCount =
            Number(
                formData.sonCount
            );

        if (
            !Number.isInteger(
                sonCount
            ) ||
            sonCount < 0 ||
            sonCount > 2
        ) {

            showSuccess(
                "Son count must be between 0 and 2.",
                true
            );

            return false;
        }
    }


    if (
        formData.daughterCount !==
        undefined
    ) {

        const daughterCount =
            Number(
                formData.daughterCount
            );

        if (
            !Number.isInteger(
                daughterCount
            ) ||
            daughterCount < 0 ||
            daughterCount > 2
        ) {

            showSuccess(
                "Daughter count must be between 0 and 2.",
                true
            );

            return false;
        }
    }


    return true;
}


/* ==========================================================
   SAVE SUBMISSION STATUS
   ========================================================== */

function saveSubmissionStatus() {

    try {

        sessionStorage.setItem(
            SUBMISSION_STORAGE_KEY,
            "Your enquiry has been submitted successfully. We will contact you soon."
        );

        return true;

    } catch (error) {

        console.error(
            "Unable to save submission status:",
            error
        );

        return false;
    }
}


/* ==========================================================
   THANK YOU POPUP
   ========================================================== */

function showThankYouPopup(
    message
) {

    const oldPopup =
        document.getElementById(
            "thankYouPopup"
        );


    if (oldPopup) {
        oldPopup.remove();
    }


    /* Overlay */

    const overlay =
        document.createElement(
            "div"
        );

    overlay.id =
        "thankYouPopup";


    overlay.style.position =
        "fixed";

    overlay.style.inset =
        "0";

    overlay.style.zIndex =
        "99999";

    overlay.style.display =
        "flex";

    overlay.style.alignItems =
        "center";

    overlay.style.justifyContent =
        "center";

    overlay.style.padding =
        "20px";

    overlay.style.background =
        "rgba(0,0,0,0.55)";


    /* Popup */

    const popup =
        document.createElement(
            "div"
        );

    popup.style.width =
        "100%";

    popup.style.maxWidth =
        "420px";

    popup.style.boxSizing =
        "border-box";

    popup.style.padding =
        "30px 25px";

    popup.style.borderRadius =
        "18px";

    popup.style.background =
        "#ffffff";

    popup.style.textAlign =
        "center";

    popup.style.boxShadow =
        "0 20px 60px rgba(0,0,0,0.25)";


    /* Success icon */

    const icon =
        document.createElement(
            "div"
        );

    icon.textContent =
        "✓";

    icon.style.width =
        "70px";

    icon.style.height =
        "70px";

    icon.style.margin =
        "0 auto 18px";

    icon.style.borderRadius =
        "50%";

    icon.style.background =
        "#16a34a";

    icon.style.color =
        "#ffffff";

    icon.style.fontSize =
        "42px";

    icon.style.fontWeight =
        "700";

    icon.style.display =
        "flex";

    icon.style.alignItems =
        "center";

    icon.style.justifyContent =
        "center";


    /* Title */

    const title =
        document.createElement(
            "h2"
        );

    title.textContent =
        "Thank You!";

    title.style.margin =
        "0 0 10px";

    title.style.fontSize =
        "28px";

    title.style.color =
        "#111827";


    /* Message */

    const text =
        document.createElement(
            "p"
        );

    text.textContent =
        message ||
        "Your form has been submitted successfully.";

    text.style.margin =
        "0 0 24px";

    text.style.fontSize =
        "16px";

    text.style.lineHeight =
        "1.6";

    text.style.color =
        "#4b5563";


    /* Button */

    const button =
        document.createElement(
            "button"
        );

    button.type =
        "button";

    button.textContent =
        "OK";

    button.style.border =
        "none";

    button.style.padding =
        "12px 32px";

    button.style.borderRadius =
        "10px";

    button.style.background =
        "#16a34a";

    button.style.color =
        "#ffffff";

    button.style.fontSize =
        "16px";

    button.style.fontWeight =
        "600";

    button.style.cursor =
        "pointer";


    /* Close */

    function closePopup() {

        overlay.remove();
    }


    button.addEventListener(
        "click",
        closePopup
    );


    overlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                overlay
            ) {

                closePopup();
            }
        }
    );


    popup.appendChild(
        icon
    );

    popup.appendChild(
        title
    );

    popup.appendChild(
        text
    );

    popup.appendChild(
        button
    );

    overlay.appendChild(
        popup
    );

    document.body.appendChild(
        overlay
    );
}


/* ==========================================================
   CHECK SUBMISSION AFTER RETURNING HOME
   ========================================================== */

function checkFormSubmission() {

    let message = null;


    try {

        message =
            sessionStorage.getItem(
                SUBMISSION_STORAGE_KEY
            );

    } catch (error) {

        console.error(
            "Unable to read submission status:",
            error
        );

        return;
    }


    if (!message) {
        return;
    }


    /* Remove immediately */

    try {

        sessionStorage.removeItem(
            SUBMISSION_STORAGE_KEY
        );

    } catch (error) {

        console.error(
            "Unable to clear submission status:",
            error
        );
    }


    /* Show popup */

    setTimeout(
        () => {

            showThankYouPopup(
                message
            );

        },
        300
    );
}


/* ==========================================================
   NUMBER INPUT RESTRICTION
   ========================================================== */

function setupChildCountInput(
    id
) {

    const input =
        document.getElementById(id);

    if (!input) {
        return;
    }


    input.type =
        "number";

    input.min =
        "0";

    input.max =
        "2";

    input.step =
        "1";


    input.addEventListener(
        "input",
        function () {

            let value =
                parseInt(
                    this.value,
                    10
                );


            if (
                Number.isNaN(value)
            ) {

                this.value = "";

                return;
            }


            if (value < 0) {
                value = 0;
            }


            if (value > 2) {
                value = 2;
            }


            this.value =
                String(value);
        }
    );
}


/* ==========================================================
   MOBILE INPUT RESTRICTION
   ========================================================== */

function setupMobileInputs() {

    document
        .querySelectorAll(
            'input[name="mobile"]'
        )
        .forEach(
            input => {

                input.addEventListener(
                    "input",
                    function () {

                        this.value =
                            this.value
                                .replace(
                                    /\D/g,
                                    ""
                                )
                                .slice(
                                    0,
                                    10
                                );
                    }
                );
            }
        );
}


/* ==========================================================
   PINCODE INPUT RESTRICTION
   ========================================================== */

function setupPincodeInputs() {

    document
        .querySelectorAll(
            'input[name="pincode"]'
        )
        .forEach(
            input => {

                input.addEventListener(
                    "input",
                    function () {

                        this.value =
                            this.value
                                .replace(
                                    /\D/g,
                                    ""
                                )
                                .slice(
                                    0,
                                    6
                                );
                    }
                );
            }
        );
}


/* ==========================================================
   MAIN
   ========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ==============================================
           CHECK THANK YOU MESSAGE
           ============================================== */

        checkFormSubmission();


        /* ==============================================
           SETUP CHILD COUNTS
           ============================================== */

        setupChildCountInput(
            "sonCount"
        );

        setupChildCountInput(
            "daughterCount"
        );


        /* ==============================================
           MOBILE
           ============================================== */

        setupMobileInputs();


        /* ==============================================
           PINCODE
           ============================================== */

        setupPincodeInputs();


        /* ==============================================
           SERVICE FORMS
           ============================================== */

        const forms =
            document.querySelectorAll(
                ".service-form"
            );


        forms.forEach(
            form => {

                form.addEventListener(
                    "submit",
                    function (event) {

                        event.preventDefault();


                        const service =
                            form.dataset.service;


                        /* Check service */

                        if (
                            !service ||
                            !GOOGLE_FORMS[
                                service
                            ]
                        ) {

                            showSuccess(
                                "Invalid service configuration.",
                                true
                            );

                            return;
                        }


                        /* Collect data */

                        const formData =
                            collectFormData(
                                form
                            );


                        /* Validate */

                        if (
                            !validateServiceForm(
                                formData
                            )
                        ) {

                            return;
                        }


                        /* Submit */

                        const submitted =
                            submitToGoogleForm(
                                service,
                                formData
                            );


                        if (!submitted) {
                            return;
                        }


                        /* Save status */

                        saveSubmissionStatus();


                        /*
                         * Give Google Form POST
                         * time to start.
                         */

                        setTimeout(
                            () => {

                                window.location.href =
                                    HOME_PAGE;

                            },
                            2000
                        );

                    }
                );

            }
        );

    }
);