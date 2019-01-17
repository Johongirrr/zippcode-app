// grabbing form
const myForm = document.querySelector('#submitForm')
const zippCode = document.querySelector('#zippCode') 
const countryCode = document.querySelector('#countryCode')
// div with id output for storing displaying result on the screen
const output = document.getElementById('output') 


// calling getCountryInfo as async await
const getCountryInfo = async (e) =>{
     
		// requesting zippcode api 
	 fetch(`http://api.zippopotam.us/${countryCode.value}/${zippCode.value}`)
	 .then(response =>{
	 	// checking status if it is ok
	 	if(response.status === 200){
	 		// parsing response body
	 	return response.json()
	 } else {
	 	// showing error message on the screen when provided wrong zippcode or countrycode
	 	output.innerHTML = 
	 	`
		<div class="card bg-danger">

			<div class="card-body">Please enter valid zipp code or country code</div>
		</div>	
	 	`

	 	throw new Error('Unable to fetch data')
	 }
	 })
	 .then(data =>{
	  
	 	// declaring variable
	 		 let insertElements  = ''
	 		// looping through places array
	 		data.places.forEach(place =>{
	 			 console.log(place['place name'])
	 			 insertElements += 
	 			   `
					<div class="card mb-4">
						<div class="card-header bg-primary">
							<button class="delete" >X</button>
						</div>
						<div class="card-body">	
							 <ul>
							    <li class="text-info make-bigger"><strong>Country:</strong> ${data.country}</li>		
							    <li class="text-info make-bigger"><strong> Post Code:</strong> ${data['post code']}</li>
							    <li class="text-info make-bigger"><strong> Place name:</strong> ${place['place name']}</li>
							    <li class="text-info make-bigger"><strong> Stat:</strong> ${place['state']}</li>
							    <li class="text-info make-bigger"><strong> Longitude:</strong> ${place['longitude']}</li>
							    <li class="text-info make-bigger"><strong> Latitude:</strong> ${place['latitude']}</li>
							 </ul>
						</div>
					</div>
	 			   `
	 		})
	 		output.innerHTML = insertElements
	 })
	 .catch(err =>{
	 	console.log(err)
	 })
		 
	 





// preventing to submit to browser when submitted
  e.preventDefault()
// clearing inputs aftersubmitted
zippCode.value = ''
 countryCode.value = ''
}





// listening for submit event on form
myForm.addEventListener('submit', getCountryInfo)

// removing card when button is clicked
const removeButton = (e)=>{
	if(e.target.className === 'delete'){
		document.querySelector('.card').remove()
	}
}

// listening for click event on body
document.querySelector('body').addEventListener('click', removeButton)
