import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../common/Layout';
import Content from '../common/Content';
import useCombineText from '../../hooks/useCombineText';
import axios from 'axios';

export default function PostDetail() {
	const { slug } = useParams();
	const [Post, setPost] = useState(null);
	const ref_title = useRef(null);
	const ref_body = useRef(null);
	const ref_category = useRef(null);
	const combineText = useCombineText();
	const navigate = useNavigate();

	const handleUpdate = () => {
		if (!ref_title.current.value.trim() || !ref_body.current.value.trim()) {
			alert('제목과 본문은 필수입력사항 입니다.');
			return;
		}
		if (!confirm('게시글을 수정하시겠습니까?')) return;
		const postData = {
			title: ref_title.current.value,
			body: ref_body.current.value,
			category: ref_category.current.value
		};
		axios
			.put(`http://localhost:8000/posts/${slug}`, postData)
			.then(res => {
				// console.log(res);
				confirm('게시글을 수정되었습니다.');
				navigate('/posts/');
			})
			.catch(err => console.log(err));
	};

	const handleDelete = () => {
		if (!confirm('게시글을 삭제하겠습니까?')) return;
		axios
			.delete(`http://localhost:8000/posts/${slug}`)
			.then(res => {
				// console.log(res);
				confirm('게시글을 삭제되었습니다.');
				navigate('/posts/');
			})
			.catch(err => console.log(err));
	};

	useEffect(() => {
		axios.get(`http://localhost:8000/posts/${slug}`).then(res => setPost(res.data));
	}, []);

	return (
		<Layout title='postDetail'>
			<Content delay={0.5}>
				<form>
					<label htmlFor='title'>제목:</label>
					<input
						ref={ref_title}
						type='text'
						name='title'
						id='title'
						placeholder='제목을 입력하세요.'
						defaultValue={Post?.title}
						required
					/>
					<br />
					<label htmlFor='body'>내용:</label>
					<textarea
						ref={ref_body}
						name='body'
						id='body'
						placeholder='본문을 입력하세요.'
						rows='5'
						cols='50'
						defaultValue={Post?.body}
						required></textarea>
					<br />
					<label htmlFor='category'>카테고리:</label>
					<select ref={ref_category} name='category' id='category' value={Post?.category}>
						<option value='PERSONAL'>Personal</option>
						<option value='BUSINESS'>Business</option>
						<option value='IMPORTANT'>Important</option>
					</select>
					<p>
						갱신일: {combineText(Post?.updated.split('T')[0], '-', '/')}
						{` (${Post?.updated.split('T')[1].slice(0, 8)})`}
					</p>
					<p>
						등록일: {combineText(Post?.created.split('T')[0], '-', '/')}
						{` (${Post?.created.split('T')[1].slice(0, 8)})`}
					</p>
					<br />
					<input type='reset' onClick={() => navigate(-1)} value='뒤로가기' />
					<input type='reset' value='초기화' />
					<input type='button' onClick={handleUpdate} value='수정' />
					<input type='button' onClick={handleDelete} value='삭제' />
				</form>
			</Content>
		</Layout>
	);
}
