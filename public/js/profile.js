

const loadData = (async () =>{
    try{
    const res = await fetch('/api/users/showme');
    const data = await res.json();
    if(!data.ok) throw new Error('Errror loading data');
    document.querySelector('.profilePicMain').style.backgroundImage = `url("/api/users/profilePic")`
    document.querySelector('.profileName').textContent = data.username;
    document.querySelector('.statistics').textContent = data.email;
    }catch(err){
        console.err(err);
    }
})()