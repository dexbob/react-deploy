import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../common/Layout';
import Content from '../common/Content';
import axios from 'axios';

export default function PostAdd() {
	const ref_title = useRef(null);
	const ref_body = useRef(null);
	const ref_category = useRef(null);
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();
		if (!ref_title.current.value.trim() || !ref_body.current.value.trim()) {
			alert('제목과 본문은 필수입력사항 입니다.');
			return;
		}
		const postData = {
			title: ref_title.current.value,
			body: ref_body.current.value,
			category: ref_category.current.value
		};
		axios
			.post('https://django-deploy-xkhx.onrender.com/posts/', postData)
			.then(res => console.log(res))
			.catch(err => console.log(err));
		navigate('/posts/');
	};

	return (
		<Layout title='addPost'>
			<Content delay={0.5}>
				<form onSubmit={handleSubmit}>
					<input
						ref={ref_title}
						type='text'
						name='title'
						id='title'
						placeholder='제목을 입력하세요.'
						required
					/>
					<br />
					<textarea
						ref={ref_body}
						name='body'
						id='body'
						rows='5'
						cols='50'
						placeholder='본문을 입력하세요.'
						required></textarea>
					<br />
					<select ref={ref_category} name='category' id='category'>
						<option value='PERSONAL'>Personal</option>
						<option value='BUSINESS'>Business</option>
						<option value='IMPORTANT'>Important</option>
					</select>
					<br />
					<input type='reset' onClick={() => navigate(-1)} value='뒤로가기' />
					<input type='reset' value='초기화' />
					<input type='submit' value='등록' />
				</form>
			</Content>
		</Layout>
	);
}
