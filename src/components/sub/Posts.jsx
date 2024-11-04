import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Content from '../common/Content';
import Layout from '../common/Layout';
import axios from 'axios';

export default function Posts() {
	const [Posts, setPosts] = useState([]);
	const [Category, setCategory] = useState('');
	const [SearchText, setSearchText] = useState('');

	const FilteredPosts =
		Category === 'BUSINESS'
			? Posts.filter(post => post.category == 'BUSINESS')
			: Category === 'PERSONAL'
			? Posts.filter(post => post.category == 'PERSONAL')
			: Category === 'IMPORTANT'
			? Posts.filter(post => post.category == 'IMPORTANT')
			: Posts;

	const handleSubmit = e => {
		e.preventDefault();
		setSearchText(e.target[0].value);
	};

	const fetchAllPosts = () => {
		axios.get('http://localhost:8000/posts').then(res => {
			// console.log(res.data);
			setPosts(res.data);
		});
	};

	useEffect(() => {
		fetchAllPosts();
	}, []);

	useEffect(() => {
		if (!SearchText) return;
		axios
			.get(`http://localhost:8000/posts-search/?search=${SearchText}`)
			.then(res => {
				// console.log(res.data);
				setPosts(res.data);
			})
			.catch(err => console.log(err.message));
	}, [SearchText]);

	return (
		<Layout title={'POSTS'}>
			<Content delay={1}>
				<article className='control'>
					<form className='searchBox' onSubmit={handleSubmit}>
						<input type='text' />
						<button>Search</button>
						<select onChange={e => setCategory(e.target.value)}>
							<option value=''>All Notes</option>
							<option value='BUSINESS'>Business</option>
							<option value='PERSONAL'>Personal</option>
							<option value='IMPORTANT'>Important</option>
						</select>
					</form>
					<button>
						<Link to={`/posts-add`}>WRITE POST</Link>
					</button>
				</article>
				<table>
					<thead>
						<tr>
							<th width='20%'>No</th>
							<th>Title</th>
							<th width='30%'>date</th>
						</tr>
					</thead>
					<tbody>
						{FilteredPosts?.map((post, idx) => (
							<tr key={post.id}>
								<td>{FilteredPosts.length - idx}</td>
								<td>
									<Link to={`/posts/${post.slug}`}>{post.title}</Link>
								</td>
								<td>
									{post.created.split('.')[0] === post.updated.split('.')[0] ? (
										<span>created at : {post.created.split('T')[0]}</span>
									) : (
										<span>updated at : {post.updated.split('T')[0]}</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Content>
		</Layout>
	);
}
