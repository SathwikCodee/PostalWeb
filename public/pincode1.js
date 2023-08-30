function getPincodeDetails(pincode) {
    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0 && data[0].Status === 'Success') {
                let Postoffices = ' ';
                for(let i=0; i<data[0].PostOffice.length;i++){
                    const Postofficesdetails = data[0].PostOffice[i];
                    Postoffices+=Postofficesdetails.Name + '\n' ;
                    

                }
                console.log(Postoffices); 
                const details = data[0].PostOffice[0];            

                document.getElementById('ansHeading').textContent = 'Postal Pincode Details:';
                document.getElementById('pin').textContent = `Pincode: ${details.Pincode}`;

                document.getElementById('place').textContent = `Postoffices : ${Postoffices}`;
                
                
                document.getElementById('district').textContent = `District : ${details.District}`;
                document.getElementById('state').textContent = `State : ${details.State}`;
                document.getElementById('country').textContent = `Country: ${details.Country}`;
            } else {
               
                document.getElementById('ansHeading').textContent = 'Invalid Pincode!';
                document.getElementById('pin').textContent = '';
                document.getElementById('place').textContent = '';
                document.getElementById('district').textContent = '';
                document.getElementById('state').textContent = '';
            }
        })

}


document.querySelector('.submit').addEventListener('click', () => {
    
    const pincode = document.getElementById('pins').value;

    if (pincode) {
        
        getPincodeDetails(pincode);
    } else {
        alert('Please enter a pincode.');
    }
});