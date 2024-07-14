const placeholder = document.querySelector(".svg-outline-placeholder"),
emojiContainer = document.querySelector(".emoji-wrapper"),
 emojis = document.querySelectorAll(".emoji");




function selectEmoji() {

    emojis.forEach((emoji) => {
        emoji.addEventListener("click", () => {
            placeholder.innerHTML = emoji.innerHTML;
            emojiContainer.classList.remove("active");
        });
    });
          
    placeholder.addEventListener("click" , (e) =>{
            e.stopPropagation();
            emojiContainer.classList.toggle("active");
    });    

    document.addEventListener("click", (e) => {
        if (!emojiContainer.contains(e.target) && e.target !== placeholder) {
            emojiContainer.classList.remove("active");
        }
    });
}
    
selectEmoji();









  



