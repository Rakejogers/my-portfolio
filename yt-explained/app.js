async function fetch_explanation(){
    var progress = document.getElementById("progress_bar");
    var button = document.getElementById("explain-button");
    progress.style.display = "block";
    button.style.display = "none";
    
    var width = 1;
    var id = setInterval(frame, 35);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            
        } else {
            width++;
            progress.value = width;
        }
    }
    

    // get the youtube id from the input field
    let url = document.getElementById("link_input").value
    function youtube_parser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }
    let yt_id=youtube_parser(url);

    console.log(yt_id)
    

    try {
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
        const response = await fetch('https://ytexplainer-1-v7805525.deta.app/ytexplainer?yt_id=' + yt_id, options);

        console.log('status code: ', response.status); // 👉️ 200
        
        if (!response.ok, !response.status == 404, !response.status == 409) {
            console.log(response);
            throw new Error(`Error! status: ${response.status}`);
        } else if(response.status == 404){
            document.getElementById("explain-text").innerHTML = "Invalid Link or video does not have transcript!"
        } else if(response.status == 409){
            document.getElementById("explain-text").innerHTML = "Video is too long! Try a shorter video."
        }else{
            const data = await response.json();
            console.log(data.message)
            document.getElementById("explain-text").innerHTML = data.message
        }
    } catch (err) {
        console.log(err);
    }
    
    

    // const requrl = 'http://127.0.0.1:8000/ytexplainer?yt_id=' + yt_id
    // //using fetch get the explanation from teh server with requrl
    // fetch(requrl)
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data.message)
    //     document.getElementById("explain-text").innerHTML = data.message
    //     // document.getElementById("explain").style.display = "block"
    // })
    // .catch(error => {
    //     console.log(error)
    // })
    
    //make the progress bar increase before displaying the explanation
    
    document.getElementById("explain").style.display = "block"
    document.getElementById("home-button").style.display = "block"
    progress.style.display = "none";
}

function refreshPage() {
    window.location.reload();
} 

// add event listener for the button
document.getElementById("explain-button").addEventListener("click", fetch_explanation);
document.getElementById("home-button").addEventListener("click", refreshPage);

