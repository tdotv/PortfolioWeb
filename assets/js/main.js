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