let input = document.getElementById('city');
let result = document.getElementById('result');
let btn = document.getElementById('btn');
let btnDark = document.getElementById('themeBtn');

btnDark.addEventListener('click',function(){
    document.body.classList.toggle('dark');
})


btn.addEventListener('click',getWeather);
input.addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        getWeather();
    }
});

async function getWeather() {
    let city = input.value.trim();
    if (city === ''){
        result.innerHTML = '<p> Please Enter Your City!!</p>';
        return;
    }
    result.innerHTML = '<p>Loading....</p>';

    try{
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=46ac15707bd845cabc9121101252011&q=${city}`);
        let data = await response.json();
        if(data.error){
            result.innerHTML = '<p>City Not Found</p>'
            return;
        }
        result.classList.remove('show');

        result.innerHTML = `<h3>${data.location.name}, ${data.location.country}</h3>
        <p><strong>${data.current.temp_c} C</strong></p>
        <p>${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}"/>`;

        setTimeout(() => result.classList.add('show'), 10);

    }catch(error){
        result.innerHTML = '<p>Something Went Wrong</p>';
    }
    
    
}