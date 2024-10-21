import { FaUserGroup } from 'react-icons/fa6';
import { FaImages, FaYoutube } from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { IoDocumentText } from 'react-icons/io5';

export default [
	{ name: 'members', path: '/members', display: 'MEMBERS', icon: FaUserGroup },
	{ name: 'gallery', path: '/gallery', display: 'GALLERY', icon: FaImages },
	{ name: 'youtube', path: '/youtube', display: 'YOUTUBE', icon: FaYoutube },
	{ name: 'contact', path: '/contact', display: 'CONTACT', icon: RiCustomerService2Fill },
	{ name: 'posts', path: '/posts', display: 'POSTS', icon: IoDocumentText }
];
