const bookingform = document.getElementById("bookingform");
const x = document.getElementById("status");

bookingform.addEventListener("submit", function(event){
    event.preventDefault();

    const name = document.getElementById("name").value;
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const room = document.getElementById("room").value;
    const guests = document.getElementById("guests").value;
    const email = document.getElementById("email").value;

    const bookingdata = {name,checkin,checkout,room,guests,email};

    fetch("/book-room",{
        method: "POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(bookingdata)
    })
    .then(response => response.json())
    .then(data =>{
        x.innerText = data.message;
        x.className = "status success";
        bookingform.reset();
    })
    .catch(error => {
        x.innerText = "Something went wrong";
        x.className = "status error";
    });
});

const bookNowBtn = document.getElementById("booknowbtn");
const bookingContainer = document.querySelector(".booking-container");
const heroImage = document.querySelector(".hero-image");

bookNowBtn.addEventListener("click", () => {
    heroImage.classList.add("hidden");
    bookingContainer.classList.remove("hidden");

    bookingContainer.scrollIntoView({ behavior: "smooth" });

    document.getElementById("name").focus();
});
