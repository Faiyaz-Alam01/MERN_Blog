import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from './ui/avatar'
import { FaRegCalendarAlt } from "react-icons/fa";
import userIcon from "@/assets/images/user.png"
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'


const BlogCard = ({props}) => {

	// console.log("props", props);
	
	
	return (
		<Link to={RouteBlogDetails(props.category.slug, props.slug)}>
			<Card className='pt-5 '> 
				<CardContent>
					<div className='flex items-center justify-between'>
						<div className='flex justify-between items-center gap-2'>
							<Avatar>
								<AvatarImage className='text-center' src={props.author.avatar || userIcon} />
							</Avatar>
							<span className='pl-2'>{props.author.name}</span>
						</div>
						{props.author.role=="admin" &&
							<Badge variant="outline" className="bg-violet-500">Admin</Badge>
						}

					</div>

					<div className='my-4'>
						<img src={props.featureImage || ''} alt="featureImage" className='rounded'/>
					</div>

					<div>
						<p className='flex items-center gap-2'>
							<FaRegCalendarAlt />
							<span>{moment(props.createdAt).format('DD-MM-YY')}</span>
						</p>
						<h1 className='text-2xl font-bold line-clamp-2'>{props.title}</h1>
					</div>
				</CardContent>
			</Card>
		</Link>
	)
}

export default BlogCard
