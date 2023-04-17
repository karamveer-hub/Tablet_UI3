let back = document.querySelector(".fixed_bar ").children[0]
let home = document.querySelector(".fixed_bar ").children[1]

back.addEventListener("click", () => {
    history.go(-1)
})
home.addEventListener("click", () => {
    window.location.href = 'index.html';
})
