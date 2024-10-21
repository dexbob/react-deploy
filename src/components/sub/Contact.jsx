import Content from '../common/Content';
import Layout from '../common/Layout';
import MailForm from '../common/MailForm';
import Map from '../common/Map';

export default function Contact() {
	console.log('Contact');
	return (
		<Layout title={'CONTACT'}>
			<Content delay={1}>
				<MailForm />
				<Map />
			</Content>
		</Layout>
	);
}
