const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close")

// show menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
  })
}

// menu hidden
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
}

// for mobile
const navLinks = document.querySelectorAll(".nav-link")

function linkAction() {
  const navMenu = document.getElementById("nav-menu")
  // when we click on each nav link, we remove the show menu class
  navMenu.classList.remove("show-menu")
}
navLinks.forEach(n => n.addEventListener("click", linkAction))

// theme customization
const theme = document.querySelector("#theme-button");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll(".choose-size span");
const bg1 = document.querySelector(".bg-1");
const bg2 = document.querySelector(".bg-2");

var root = document.querySelector(":root");

// open modal
const openThemeModal = () => {
  themeModal.style.display = "grid";
}

// close modal
const closeThemeModal = (e) => {
  if (e.target.classList.contains("customize-theme")) {
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
    if (size.classList.contains("font-size-1")) {
      fontSize = "14px";
      localStorage.setItem("font", "font-size-1");
    }
    else if (size.classList.contains("font-size-2")) {
      fontSize = "16px"
      localStorage.setItem("font", "font-size-2");
    }
    else if (size.classList.contains("font-size-3")) {
      fontSize = "18px"
      localStorage.setItem("font", "font-size-3");
    }

    // change font size of the root element
    document.querySelector("html").style.fontSize = fontSize;
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

  localStorage.setItem("theme", "light");
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

  localStorage.setItem("theme", "dark");
  changeBg();
})

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    darkColorLightness = "95%";
    lightColorLightness = "20%";
    whiteColorLightness = "15%";
    altColor = "#4d4d4d";
    altColorDark = "#d4d4d4";
    bg2.classList.add("active");
    bg1.classList.remove("active");
    root.style.setProperty("--image-filter", "invert(1)");
  } else {
    darkColorLightness = "17%";
    lightColorLightness = "93%";
    whiteColorLightness = "100%";
    altColor = "#d4d4d4";
    altColorDark = "#4d4d4d";
    bg1.classList.add("active");
    bg2.classList.remove("active");
    root.style.setProperty("--image-filter", "invert(0)");
  }
  changeBg();

  removeSizeSelector();
  const savedFont = localStorage.getItem("font");
  let fontSize;
  if (savedFont === "font-size-1") {
    document.querySelector(".font-size-1").classList.add("active");
    fontSize = "14px";
  } else if (savedFont === "font-size-2") {
    document.querySelector(".font-size-2").classList.add("active");
    fontSize = "16px";
  } else if (savedFont === "font-size-3") {
    document.querySelector(".font-size-3").classList.add("active");
    fontSize = "18px";
  }
  const htmlElement = document.querySelector("html");
  htmlElement.style.fontSize = fontSize;
});

// contact form
const contactForm = document.getElementById("contact-form"),
  contactEmail = document.getElementById("contact-email"),
  contactSubject = document.getElementById("contact-subject"),
  contactMessage = document.getElementById("message");

const sendEmail = (e) => {
  e.preventDefault();

  // check if the field has a value 
  if (contactEmail.value === "" || contactSubject.value === "" || contactMessage.value === "") {
    showDanger("You should fill all the input fields!", 3500);
  } else {
    //  serviceId - templateId - #form - publickey
    emailjs.sendForm("service_52xs2bt", "template_1pesm7h", "#contact-form", "FQGzjktgZf1SZDXPO")
      .then(() => {
        // show message
        showSuccess("Accepted", 3500);
      },
        (error) => {
          showDanger("Something went wrong...", 3500);
        });
  }
};

if (window.location.pathname === "/PortfolioWeb/contactme.html") {
  contactForm.addEventListener("submit", sendEmail);
}

function showSuccess(message, duration) {
  const alertContainer = document.getElementById("alert-container");

  const success = document.createElement("div");
  success.className = "success";

  const successContent = document.createElement("div");
  successContent.className = "success-content";
  successContent.textContent = message;
  success.appendChild(successContent);

  const closeButton = document.createElement("span");
  closeButton.className = "success-close";
  closeButton.textContent = "×";
  closeButton.addEventListener("click", () => {
    success.classList.remove("show");
    setTimeout(() => {
      success.remove();
    }, 300);
  });
  success.appendChild(closeButton);

  alertContainer.insertBefore(success, alertContainer.firstChild);

  setTimeout(() => {
    success.classList.add("show");
  }, 100);

  if (duration) {
    setTimeout(() => {
      success.classList.remove("show");
      setTimeout(() => {
        success.remove();
      }, 300);
    }, duration);
  }
}

function showDanger(message, duration) {
  const alertContainer = document.getElementById("alert-container");

  const danger = document.createElement("div");
  danger.className = "danger";

  const dangerContent = document.createElement("div");
  dangerContent.className = "danger-content";
  dangerContent.textContent = message;
  danger.appendChild(dangerContent);

  const closeButton = document.createElement("span");
  closeButton.className = "danger-close";
  closeButton.textContent = "×";
  closeButton.addEventListener("click", () => {
    danger.classList.remove("show");
    setTimeout(() => {
      danger.remove();
    }, 300);
  });
  danger.appendChild(closeButton);

  alertContainer.insertBefore(danger, alertContainer.firstChild);

  setTimeout(() => {
    danger.classList.add("show");
  }, 100);

  if (duration) {
    setTimeout(() => {
      danger.classList.remove("show");
      setTimeout(() => {
        danger.remove();
      }, 300);
    }, duration);
  }
}