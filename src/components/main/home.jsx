import _ from 'lodash';
import Visual from './Visual';
import Layout from '../common/Layout';

export default function Home() {
	// test();
	return (
		<Layout title={'HOME'}>
			<Visual />
		</Layout>
	);
}

const test = () => {
	console.log('TEST-TEST');
	var myFriend = [
		{ name: 'kys', job: 'developer', age: 27 },
		{ name: 'cys', job: 'webtoons man', age: 27 },
		{ name: 'yhs', job: 'florist', age: 26 },
		{ name: 'chj', job: 'nonghyup man', age: 27 },
		{ name: 'ghh', job: 'coffee man', age: 27 },
		{ name: 'ldh', job: 'kangaroo father', age: 27 },
		{ name: 'hsy', job: 'monk', age: 27 }
	];
	console.log(_.findIndex(myFriend, { job: 'monk' }));
	console.log(_.findIndex(myFriend, ['age', 26]));
	console.log(_.findIndex(myFriend, f => f.name === 'ghh'));
	console.log(_.flatten([1, [2, [3, [4]], 5]]));
	console.log(_.flattenDeep([1, [2, [3, [4]], 5]]));
	console.log(_.flattenDepth([1, [2, [3, [4]], 5]], 2));
	const arr = [1, 2, 3, 4, 5];
	console.log(
		'홀수',
		_.remove(arr, n => n % 2)
	);
	console.log('짝수', arr);
	console.log(_.isEqual({ a: 1 }, { a: 1 }));
	const curr = _.curry((a, b, c) => [a, b, c]);
	console.log(curr(1)(2)(3));
	console.log(curr(1)(2, 3));
	console.log(curr(1, 2)(3));
	console.log(curr(1, 2, 3));
	window.addEventListener(
		'scroll',
		_.throttle(() => console.log('scroll'), 2000)
	);
	window.addEventListener(
		'resize',
		_.debounce(() => console.log('resize'), 500)
	);
};
