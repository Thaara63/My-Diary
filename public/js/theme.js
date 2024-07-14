const colorThemes = document.querySelectorAll('[name=theme]');

function storeTheme(theme) {
    localStorage.setItem("theme", theme);
    
};

function setTheme(){
    const activeTheme = localStorage.getItem("theme");
    
    colorThemes.forEach((themeOption) => {
        if(themeOption.id === activeTheme){
            themeOption.checked = true;
        };
    });

    document.documentElement.className = theme;
};

colorThemes.forEach((themeOption) =>{
    themeOption.addEventListener("click", () =>{
        storeTheme(themeOption.id);
    })
})

document.onload = setTheme();