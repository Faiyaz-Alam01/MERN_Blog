import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import slugify from 'slugify'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFetch } from '@/hooks/usefetch'
import Dropzone from 'react-dropzone'
import Editor from '@/components/Editor'
import { showToast } from '@/helpers/showToast'
import { useNavigate } from 'react-router-dom'
import { RouteBlog } from '@/helpers/RouteName'
import { useSelector } from 'react-redux'
import { decode } from 'entities'
import { getEvn } from '@/helpers/getEnv'


const AddblogTitle = () => {

	const navigate = useNavigate();

	const user = useSelector((state) => state.user)

	const {data:categoryData, loading, error} = useFetch(`${getEvn("VITE_API_BASE_URL")}/category/all-category`,{
			method:"get",
			credentials: 'include'
	})

	const [filePreview, setPreview] = useState()
	const [file, setFile] = useState()

	const formSchema = z.object({
		category: z.string().min(3,'category must be at least 3 character long.'),
		title: z.string().min(3,'title must be at least 3 character long.'),
		slug: z.string().min(3,'slug must be at least 3 character long.'),
		blogContent: z.string().min(10,'blogContent must be at least 10 character long')
	})
	
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
		  category:"",
		  title:"",
		  slug:"",
		  blogContent:""
		},
	})

	const handleEditordata = (event, editor)=> {
		const data = editor.getData();
		form.setValue('blogContent', data)
	}
	
	const blogTitle = form.watch('title')

	useEffect(()=>{
		if(blogTitle){
			const slug = slugify(blogTitle,{lower: true})
			form.setValue('slug', slug)
		}
	},[blogTitle])




	async function onSubmit(values) {
		
		try {
            const newValues = { ...values, author: user.user._id}
			if (!file) {
				showToast('error', 'Feature image required.')
			}

            const formData = new FormData()
            formData.append('file', file)
            formData.append('data', JSON.stringify(newValues))

            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/blog/add`, {
                method: 'post',
                credentials: 'include',
                body: formData
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            form.reset()
            setFile()
            setPreview()
            navigate(RouteBlog)
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
  	}

	
	const handleFileSelection= (files)=> {
		// console.log(files);
		const file = files[0]
		const preview = URL.createObjectURL(file)
		setFile(file)
		setPreview(preview);
		
	}

  	return (
		<div>
			<Card className='pt-5'> 
				<CardContent>
				    <h1 className='text-2xl font-bold text-center'>Add Blog</h1> 
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							{/* category */}
							<div className='mb-3 '>
								<FormField
									control={form.control}
									name="category"
									render={({ field }) => (
									<FormItem>
										{/* {console.log(field)} */}
										
										<FormLabel>Category</FormLabel>
										<FormControl>
											<Select  onValueChange={field.onChange}
											
												defaultValue={field.value}>  
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select Category" />
												</SelectTrigger>
												<SelectContent>
													{categoryData && categoryData.category.length > 0 &&
														categoryData.category.map(category =>
															<SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
														)
													}	
													
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
									)}
								/>
							</div>

							<div className='mb-3'>
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
										<Input placeholder="Enter blog title" {...field} />
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

							<div className='mb-3'>
								<span className='mb-2 block'>Feature image</span>
								<Dropzone onDrop={acceptedFiles =>handleFileSelection (acceptedFiles)}>
									{({getRootProps, getInputProps}) => (
										<section>
										<div {...getRootProps()}>
											<input {...getInputProps()} />
											<div className='flex justify-center items-center w-40 h-28
											border-2 border-dashed rounded outline-none overflow-hidden'>
												<img
													className='object-cover"'
												 src={filePreview} />
											</div>
										</div>
										</section>
									)}
								</Dropzone>
							</div>
							{/* blog content */}
							<div className='mt-4'>
								<FormField
									control={form.control}
									name="blogContent"
									render={({ field }) => (
									<FormItem>
										<FormLabel>Blog Content</FormLabel>
										<FormControl>
											<Editor props = {{initialData : "",  onChange: handleEditordata}}/>
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

export default AddblogTitle
