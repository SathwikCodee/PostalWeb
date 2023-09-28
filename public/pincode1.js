const element = document.getElementById('details-pincode');


function getPincodeDetails(pincode) {
    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0 && data[0].Status === 'Success') {
                let Postoffices = [];
                for(let i=0; i<4;i++){
                    const Postofficesdetails = data[0].PostOffice[i];
                    Postoffices.push(Postofficesdetails.Name) ;
                    

                }
                console.log(Postoffices); 
                const details = data[0].PostOffice[0];            

                document.getElementById('ansHeading').textContent= 'Postal Pincode Details:';
                document.getElementById('pin').textContent = `Pincode: ${details.Pincode}`;

                document.getElementById('place').textContent = `Postoffices : ${Postoffices.join()+"\n"}`;
                
                
                document.getElementById('district').textContent = `District : ${details.District}`;
                document.getElementById('state').textContent = `State : ${details.State}`;
                document.getElementById('country').textContent = `Country: ${details.Country}`;
            } else {
               
                document.getElementById('ansHeading').textContent = 'Invalid Pincode!';

            }
        })

}


document.querySelector('.submit').addEventListener('click', () => {
    
    const pincode = document.getElementById('pins').value;

    if (pincode) {
        element.style.marginTop = '5%';
        element.style.border = '2px solid rgba(255, 255, 255, 0.5)';
        element.style.width = '40%';
        element.style.height = '500px';
        element.style.background = 'transparent';
        element.style.borderRadius = '20px';
        element.style.backdropFilter = 'blur(5px)';
        element.style.paddingLeft = '3%';
        element.style.textAlign = 'left';
        element.style.marginLeft = '30%';
         
        getPincodeDetails(pincode);
    } else {
        alert('Please enter a pincode.');
    }
});
