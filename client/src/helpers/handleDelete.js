export const deletedata = async(endpoint)=>{
	const c = confirm("Are you sure to delete this data?")
	if (!c) return false;

	try {
		const response = await fetch(endpoint,{
			method: 'delete',
			credentials: "include"
		})
		const data = await response.json();

		if(!response.ok){
			throw new Error(response.statusText)
		}

		return true
	} catch (error) {
		console.log(error)
		return false
	}

}