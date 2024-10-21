import Layout from '../common/Layout';
import Content from '../common/Content';
import MaskText from '../common/MaskText';
import MaskBox from '../common/MaskBox';
import Pic from '../common/Pic';
import memberData from '../../data/memberData';

export default function Members() {
	return (
		<Layout title={'MEMBERS'}>
			<MaskText delay={0.5} color='#444' style={{ fontSize: 20 }}>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, illum!
			</MaskText>
			<br />
			<MaskText delay={1} color='#666' style={{ marginBottom: 80, fontSize: 16 }}>
				Lorem ipsum dolor sit amet.
			</MaskText>
			<Content delay={1}>
				<article className='ceoBox'>
					<div className='txt'>
						<h2>{memberData[0].name}</h2>
						<p>{memberData[0].position}</p>
					</div>
					<MaskBox className='picWrapper' style={{ width: '50%', height: '65vh' }} delay={1}>
						<Pic src={'/' + memberData[0].pic} shadow style={{ width: '100%', height: '100%' }} />
					</MaskBox>
				</article>

				<article className='memberListBox'>
					<div className='titBox'>
						<h2>Our Team Members</h2>
						{/* 미리 생성한 빈 참조객체에 담고 싶은 가상DOM요소에 ref 속성 연결 */}
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora possimus non ipsa
							cum. Veritatis, dolore aliquam? Consectetur assumenda dolor labore.
						</p>
					</div>

					<ul>
						{memberData.map((member, idx) => {
							if (idx !== 0) {
								return (
									<li key={idx}>
										{/* 이미지 컴포넌트 호출후 src에 이미지 url값 전달, pic클래스에는 이미지의 크기정도만 지정 */}
										<Pic src={member.pic} className='pic' shadow={true} />
										<div className='txt'>
											<h2>{member.name}</h2>
											<p>{member.position}</p>
										</div>
									</li>
								);
							}
						})}
					</ul>

					<div className='descBox'>
						<h2>Lorem ipsum dolor sit.</h2>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. A esse cupiditate, vitae
							deleniti repellat explicabo sit, corrupti beatae dicta, nulla optio corporis alias.
							Perferendis quidem sapiente minima, quisquam inventore soluta.
						</p>
					</div>
				</article>
			</Content>
		</Layout>
	);
}
