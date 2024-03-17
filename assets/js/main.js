const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close")

// show menu
if(navToggle)
{
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu")
    })
}

// menu hidden
if(navClose)
{
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu")
    })
}

// for mobile
const navLinks = document.querySelectorAll(".nav-link")

function linkAction()
{
    const navMenu = document.getElementById("nav-menu")
    // when we click on each nav link, we remove the show menu class
    navMenu.classList.remove("show-menu")
}
navLinks.forEach(n => n.addEventListener("click", linkAction))

// theme customization
const theme = document.querySelector("#theme-button");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll(".choose-size span");
const colorPalette = document.querySelectorAll(".choose-color span");
const bg1 = document.querySelector(".bg-1");
const bg2 = document.querySelector(".bg-2");

var root = document.querySelector(":root");


// open modal
const openThemeModal = () => {
    themeModal.style.display = "grid";
}

// close modal
const closeThemeModal = (e) => {
    if(e.target.classList.contains("customize-theme"))
    {
        themeModal.style.display = "none";
    }
}

theme.addEventListener("click", openThemeModal);
themeModal.addEventListener("click", closeThemeModal);

// fonts
// remove active class
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove("active");
    })
}
fontSizes.forEach(size => {
    size.addEventListener("click", () => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle("active");
        if(size.classList.contains("font-size-1"))
        {
            fontSize = "14px";
        }
        else if(size.classList.contains("font-size-2"))
        {
            fontSize = "16px"
        }
        else if(size.classList.contains("font-size-3"))
        {
            fontSize = "18px"
        }

        // change font size of the root element
        document.querySelector('html').style.fontSize = fontSize;
    })
})

// primary colors
// remove active class
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove("active");
    })
}
colorPalette.forEach(color => {
    color.addEventListener("click", () => {
        let primaryHue;
        changeActiveColorClass();

        if(color.classList.contains("color-1"))
        {
            primaryHue = 252;
        }
        else if(color.classList.contains("color-2"))
        {
            primaryHue = 352;
        }
        else if(color.classList.contains("color-3"))
        {
            primaryHue = 282;
        }
        color.classList.add("active");
        root.style.setProperty("--primary-color-hue", primaryHue);
    })
})

let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;
let altColor;
let altColorDark;

// change background color
const changeBg = () => {
    root.style.setProperty("--light-color-lightness", lightColorLightness);
    root.style.setProperty("--white-color-lightness", whiteColorLightness);
    root.style.setProperty("--dark-color-lightness", darkColorLightness);
    root.style.setProperty("--color-alt", altColor);
    root.style.setProperty("--color-alt-dark", altColorDark);
}
bg1.addEventListener("click", () => {
    darkColorLightness = "17%";
    lightColorLightness = "93%";
    whiteColorLightness = "100%";

    altColor = "#d4d4d4";
    altColorDark = "#4d4d4d";

    bg1.classList.add("active");
    bg2.classList.remove("active");
    root.style.setProperty("--image-filter", "invert(0)");
    changeBg();
})

bg2.addEventListener("click", () => {
    darkColorLightness = "95%";
    lightColorLightness = "20%";
    whiteColorLightness = "15%";

    altColor = "#4d4d4d";
    altColorDark = "#d4d4d4";

    bg2.classList.add("active");
    bg1.classList.remove("active");
    root.style.setProperty("--image-filter", "invert(1)");
    changeBg();
})

// contact form
const contactForm = document.getElementById("contact-form"),
      contactEmail = document.getElementById("contact-email"),
      contactSubject = document.getElementById("contact-subject"),
      contactMessage = document.getElementById("message");

const sendEmail = (e) => {
    e.preventDefault();

    // check if the field has a value 
    if(contactEmail.value === "" || contactSubject.value === "" || contactMessage.value === "") {
        alertify.error("You should fill all the input fields!");
    } else {
        //  serviceId - templateId - #form - publickey
        emailjs.sendForm("service_52xs2bt", "template_1pesm7h", "#contact-form", "FQGzjktgZf1SZDXPO")
        .then(() => {
            // show message
            alertify.success("Accepted");
        },
        (error) => {
            alertify.error("Something went wrong...", error);
        });
    }
};

contactForm.addEventListener("submit", sendEmail);