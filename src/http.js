export async function fetchAvailbalePlaces() {
  const response = await fetch("http://localhost:3000/places");
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  const resData = await response.json();
  return resData.places;
}

export async function updatedUserPlaces(places){
    const response = await fetch('http://localhost:3000/user-places',{
        method:'PUT',
        body: JSON.stringify({places}),
        headers:{
            'Content-Type':'application/json',
        }
    })

    const resData = response.json();
    if(!response.ok){
        throw new Error("Data not updated");
    }

    return resData.message;
}