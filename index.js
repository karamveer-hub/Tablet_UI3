
let feed_yes = document.querySelectorAll(".feed_want")
let tellus_more_page = document.querySelector(".tellus_more_page")
let tellus_more = document.querySelector(".tellus_more")
let contactDetails = document.querySelector(".contactDetails")
let buttonDiv = document.querySelector("#no_feedback_submit")
let no_feedback_submit_button = document.querySelector("#no_feedback_submit_button")
let sbmbutton = document.querySelector(".sbmbutton")
let did_u_get = document.getElementsByName("wanted")
let user_info = document.querySelectorAll(".user_info")

const shopping_experience = document.querySelectorAll(".shopping_experience")
const radioButtons = document.querySelectorAll('input[name="wanted"]');
const radioButtons2 = document.querySelectorAll('input[name="feedback_wanted"]');

let feedback_page_hide = document.querySelector(".feedback_page_wrapper")

let feedback_emoji = document.querySelectorAll(".feedback_redirect")


let feeback_img_outline = document.querySelectorAll(".feeback_img_outline")
let ciagrette_feedback_name = document.querySelector("#ciagrette_feedback_name")

let user_name_data=document.querySelector("#user_name")
let user_number_data=document.querySelector("#user_number")

//declaring variable for storing user data
let user_feed;
let user_did_u_get;
let user_shopping_experience;
let user_ciagrette_name;
var feeback_page_emoji;





//clicking functionalty for selecting one ciagrette and storing the name of ciagrette

let click = 0;
feeback_img_outline.forEach(elem => {
    elem.addEventListener("click", (e) => {
        e.preventDefault()
        user_ciagrette_name = elem.alt                     //storing ciagrette name of the customer
        if (click == 0 || click < 1) {
            click++;
            elem.classList.add("outline_selected")
            ciagrette_feedback_name.innerText = `B. How was your experience smoking
            ${elem.alt}? `
        }
        else {
            if (click == 1) {
                if (elem.classList.contains("outline_selected")) {
                    click--;
                    elem.classList.remove("outline_selected")
                    ciagrette_feedback_name.innerText = "B. How was your experience smoking?"
                }
            }
        }
    })
})



//adding styling on clicking of radio button by the user for submit button and form inputs (adding styling is due to these classes)
feed_yes.forEach(elem => {
    elem.addEventListener("click", (e) => {
        if (elem.value === 'yes') {
            tellus_more_page.classList.add("form_page")
            tellus_more.classList.add("form")
            tellus_more_page.classList.remove("submit_page")
            tellus_more.classList.remove("submit")
            contactDetails.style.display = "block"
            buttonDiv.style.display = "none"
        }
        else {
            tellus_more_page.classList.add("submit_page")
            tellus_more.classList.add("submit")
            tellus_more_page.classList.remove("form_page")
            tellus_more.classList.remove("form")
            buttonDiv.style.display = "block"
            contactDetails.style.display = "none"
        }

    })
})



// getting customer info by clicking
shopping_experience.forEach(elem => {
    elem.addEventListener("click", (e) => {
        user_shopping_experience = elem.children[1].alt;
    })
})


feedback_emoji.forEach(elem => {
    elem.addEventListener("click", (e) => {
        feeback_page_emoji = elem.children[1].alt
        feedback_page_hide.classList.toggle("show")        //merging feedback and tellus_more_page as we were not getting data from the previous feedback page after submit
        tellus_more_page.classList.toggle("show")
    })
});








//submit button styling adding functionalty on user inputs

user_info.forEach(elem => {
console.log(elem);
    elem.addEventListener('keyup', (e) => {
        if (user_name.value != ' ' && user_number.value != ' ') {
            e.preventDefault()
            sbmbutton.style.background = " linear-gradient(270deg, #447AEC 0%, #2A5CDC 100%"
        }
    })
})





// submitting data with customer name or without customer name

sbmbutton.addEventListener('click', (e) => {
    e.preventDefault()
    user_name.value == ' ' && user_number.value == ' '
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            user_did_u_get = radioButton.value;
            break;
        }
    }
    for (const radioButton of radioButtons2) {
        if (radioButton.checked) {
            user_feed = radioButton.value;
            break;
        }
    }
    getData()                     //transfering data to database
    
    //unchecking radio buttons
    for (const radioButton of radioButtons) {
        radioButton.checked=false
    }
    for (const radioButton of radioButtons2) {
        radioButton.checked=false
    }
    setTimeout(() => {
        window.location.href = 'thanku.html';
    }, 100);
})





no_feedback_submit_button.addEventListener("click", (e) => {
    e.preventDefault()
    user_name.value == ' ' && user_number.value == ' '
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            user_did_u_get = radioButton.value;
            break;
        }
    }
    for (const radioButton of radioButtons2) {
        if (radioButton.checked) {
            user_feed = radioButton.value;
            break;
        }
    }
    getData()                      //transfering data to database
    
    //unchecking radio buttons
    for (const radioButton of radioButtons) {
        radioButton.checked=false
    }
    for (const radioButton of radioButtons2) {
        radioButton.checked=false
        
    }
    setTimeout(() => {
        window.location.href = 'thanku.html';
    }, 100);
    
})





// Connecting supabase to the project
const sb = supabase.createClient('https://qopwvyhgswjzhujqqbfa.supabase.co', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvcHd2eWhnc3dqemh1anFxYmZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEzNzUxODksImV4cCI6MTk5Njk1MTE4OX0.kksfMR19xFb5CZkYw9MOb8tFF8p3UE5uAtIPGgT2t4g')


// storing data into the database
async function getData() {
    console.log(feeback_page_emoji,user_ciagrette_name,user_did_u_get,user_feed,user_shopping_experience)
    const { data, error } = await sb
        .from('users_feedback')
        .insert(
            {
                ciagrette_name: user_ciagrette_name,
                ciagrette_feedback: feeback_page_emoji,
                customer_number: user_number_data.value,
                did_you_get_what_u_wanted: user_did_u_get,
                customer_name: user_name_data.value,
                get_in_touch: user_feed,
                shopping_exp: user_shopping_experience
            }
        )
   
}
