import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useEffect } from 'react'
import { Form } from '@/components/ui/form'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import slugify from 'slugify'
import { showToast } from '@/helpers/showToast'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useFetch } from '@/hooks/usefetch.js'

const EditCategory = () => {
	const {category_id} = useParams()

	
	
	const {data:categoryData, loading, error} = useFetch(`${import.meta.env.VITE_API_BASE_URL}/category/show/${category_id}`,{
		method:"get",
		credentials: 'include'
	},[category_id])
	
	

	const formSchema = z.object({
		name: z.string().min(3,'name must be at least 3 character long.'),
		slug: z.string().min(3,'slug must be at least 3 character long.'),
	})
	
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
		  name:"",
		  slug:""
		},
	})

	//for dynamic slug
	const categoryName = form.watch('name')
	useEffect(()=>{
		if(categoryName){
			const slug = slugify(categoryName,{lower: true})
			form.setValue('slug', slug)
		}
	},[categoryName])

	useEffect(()=>{
		if(categoryData ){
			form.setValue('name',categoryData.category.name )
			form.setValue('slug',categoryData.category.slug )
		}
	},[categoryData])

	async function onSubmit(values) {
		try{
		// console.log("Sending data:", values);
		const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/category/update/${category_id}`, values);

		const data = response.data;
		
		if(!data.success){
			return showToast('error', data.message)        
		}
		showToast('success', data.message)
		form.reset()
		}catch(error){
		showToast('error',error.message )
		}
	}

	return (
		<div>
			<Card className='pt-5 max-w-screen-md mx-auto'>  
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className='mb-3'>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
									<Input placeholder="Enter your name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
								)}
							/>
							</div>

							<div className='mb-3'>
							<FormField
								control={form.control}
								name="slug"
								render={({ field }) => (
								<FormItem>
									<FormLabel>Slug</FormLabel>
									<FormControl>
									<Input placeholder="Slug" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
								)}
							/>
							</div>


							<Button type="submit" className="w-full">Submit</Button>


						</form>
					</Form>
				</CardContent>      
			</Card>
		</div>
	)
}

export default EditCategory
