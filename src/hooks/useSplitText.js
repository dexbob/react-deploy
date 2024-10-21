export default function UseSplitText() {
	return (ref, option) => {
		if (!ref) return;
		const defaultOption = { interval: 0, delay: 0 };
		option = { ...defaultOption, ...option };

		let text = ref.current.innerText;
		let tags = "";
		let i = 0;
		for (let letter of text) {
			tags += `<span style='transition-delay:${
				option.delay + option.interval * i++
			}s'>${letter}</span>`;
		}
		ref.current.innerHTML = tags;

		setTimeout(() => {
			ref.current.classList.add("on");
		}, 100);
	};
}

/*
  setTimeout의 delay값을 0으로만 줘도 연결된 콜백함수는 web api실행 후
  task queue를 거쳐 callstack으로 넘어가게 됨
  따라서 해당 코드는 ref.current.innerHTML = tags; 실행된뒤 호출됨 (동기화됨)

  그럼에도 불구하고 100이라는 지연시간을 준 이유는
  동기화 시점이 innerHTML로 동적 요소를 넣는 호출 시점일 뿐
  실제 동적으로 DOM이 최종 생성된 시점 이후를 보장하진 않기 때문에
  물리적으로 실제 돔으로 변환될 약간의 시간을 확보하기 위함
*/

/*
파일: _layoyut.scss 
main {
	width: 100%;
	padding: 10vh 15vw;
	min-height: 120vh;

	h1 {
		font: 200 6vmax/1 "raleway";
		color: #444;
		margin-bottom: 50px;

		span {
			display: inline-block;
			opacity: 0;
			transform: scale(3) rotate(220deg);
			transform-origin: 10px 10px;
			transition: all 0.5s;
		}

		&.on {
			span {
				opacity: 1;
				transform: scale(1) rotate(0);
			}
		}
	}
}
*/
