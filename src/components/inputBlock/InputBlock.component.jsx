import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDetailInfo } from '../../redux/store';
import style from './InputBlock.module.scss'

const InputBlock = () => {

	const [name, setName] = useState('');
	const [timeOfTask, setTimeOfTask] = useState();
	const [quantyOfTask, setQuantyOfTask] = useState();
	const [quantyOfReal, setQuantyOfReal] = useState();
	const [tarifERP, setTarifERP] = useState(174);
	const [tarifClean, setTarifClean] = useState(139.5);

	const [timeToNeed, setTimeToNeed] = useState();
	const [timeToOneDetal, setTimeToOneDetal] = useState();

	const [moneyQuantyOfERP, setMoneyQuantyOfERP] = useState();
	const [moneyQuantyOfClean, setMoneyQuantyOfClean] = useState();
	const [isInputFull, setIsInputFull] = useState(false);

	const ref1 = useRef();
	const ref2 = useRef();
	const ref3 = useRef();
	const ref4 = useRef();
	const ref5 = useRef();
	const ref6 = useRef();

	const addDetail = useDetailInfo(state => state.addDetail);
	const clearStore = useDetailInfo(state => state.clearStore);

	useEffect(() => {
		setIsInputFull(ref1.current.value !== '' &&
			+ref2.current.value !== 0 &&
			+ref3.current.value !== 0 &&
			+ref4.current.value !== 0 &&
			+ref5.current.value !== 0 &&
			+ref6.current.value !== 0);
	}, [name, timeOfTask, quantyOfTask, quantyOfReal, tarifClean, tarifERP]);

	useEffect(() => {
		timeOfTask && quantyOfTask && quantyOfReal && setTimeToNeed((timeOfTask / quantyOfTask * quantyOfReal).toFixed(2));
		timeOfTask && quantyOfTask && setTimeToOneDetal((timeOfTask / quantyOfTask * 60).toFixed(2));
		timeOfTask && quantyOfTask && quantyOfReal && tarifERP && setMoneyQuantyOfERP((timeOfTask / quantyOfTask * quantyOfReal * tarifERP).toFixed(2));
		timeOfTask && quantyOfTask && quantyOfReal && tarifClean && setMoneyQuantyOfClean((timeOfTask / quantyOfTask * quantyOfReal * tarifClean).toFixed(2));
	}, [timeOfTask, quantyOfTask, quantyOfReal, tarifClean, tarifERP]);


	const addToStore = (e) => {
		e.preventDefault();

		isInputFull &&
			addDetail(ref1.current.value, ref2.current.value, ref3.current.value, ref4.current.value, ref5.current.value, ref6.current.value);

		setName('');
		setTimeOfTask(0);
		setQuantyOfTask(0);
		setQuantyOfReal(0);
		setTarifERP(174);
		setTarifClean(139.5);
	}

	const clearStoreHandle = (e) => {
		clearStore();
	}

	return (
		<div className={style.inner}>

			<Form onSubmit={addToStore} className="mt-3 mb-3">

				<InputGroup className="mt-3 mb-3">
					<InputGroup.Text id="detail-name">Название детали</InputGroup.Text>
					<Form.Control
						ref={ref1}
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder='Введи название детали'
						aria-label="Detail name"
						aria-describedby="detail-name"
					/>
				</InputGroup>

				<InputGroup className="mt-3 mb-3">
					<InputGroup.Text id="time-task">Время по заданию (полное)</InputGroup.Text>
					<Input
						type="text"
						inputmode="numeric"
						pattern="[0-9]*"
						ref={ref2}
						value={timeOfTask}
						onChange={e => setTimeOfTask(+e.target.value)}
						placeholder='Введи время по заданию'
						aria-label="Time task"
						aria-describedby="time-task"
					/>
					<InputGroup.Text>час</InputGroup.Text>
				</InputGroup>

				<InputGroup className="mt-3 mb-3">
					<InputGroup.Text id="quantyOfTask">Количество по заданию</InputGroup.Text>
					<Form.Control
						ref={ref3}
						type='number'
						value={quantyOfTask}
						onChange={e => setQuantyOfTask(+e.target.value)}
						placeholder='Введи количество по заданию'
						aria-label="Quanty Of Task"
						aria-describedby="quantyOfTask"
					/>
					<InputGroup.Text>штук</InputGroup.Text>
				</InputGroup>

				<InputGroup className="mt-3 mb-3">
					<InputGroup.Text id="quantyOfReal">Фактическое количество</InputGroup.Text>
					<Form.Control
						ref={ref4}
						type='number'
						value={quantyOfReal}
						onChange={e => setQuantyOfReal(+e.target.value)}
						placeholder='Введи фактическое количество'
						aria-label="Quanty Of Real"
						aria-describedby="quantyOfReal"
					/>
					<InputGroup.Text>штук</InputGroup.Text>
				</InputGroup>

				<InputGroup className="mt-3 mb-3">
					<InputGroup.Text id="tarifERP">Тариф ERP</InputGroup.Text>
					<Form.Control
						ref={ref5}
						type='number'
						value={tarifERP}
						onChange={e => setTarifERP(+e.target.value)}
						placeholder='Введи тариф ERP'
						aria-label="Tarif ERP"
						aria-describedby="tarifERP"
					/>
					<InputGroup.Text>грн</InputGroup.Text>
				</InputGroup>

				<InputGroup className="mt-3 mb-3">
					<InputGroup.Text id="tarifClean">Чистая ставка</InputGroup.Text>
					<Form.Control
						ref={ref6}
						type='number'
						value={tarifClean}
						onChange={e => setTarifClean(+e.target.value)}
						placeholder='Введи чистую ставку'
						aria-label="Tarif Clean"
						aria-describedby="tarifClean"
					/>
					<InputGroup.Text>грн</InputGroup.Text>
				</InputGroup>

				<InputGroup className="mt-3 mb-3">
					<InputGroup.Text id="timeToNeed">Время на изготовление фактического количества деталей</InputGroup.Text>
					<Form.Control
						type='number'
						disabled
						value={timeToNeed}
						onChange={e => setTimeToNeed(+e.target.value)}
						placeholder='Время на изготовление фактического количества деталей'
						aria-label="Time To Need"
						aria-describedby="timeToNeed"
					/>
					<InputGroup.Text>час</InputGroup.Text>
				</InputGroup>

				<InputGroup className="mt-3 mb-3">
					<InputGroup.Text id="timeToOneDetal">Время на изготовление одной детали</InputGroup.Text>
					<Form.Control
						type='number'
						disabled
						value={timeToOneDetal}
						onChange={e => setTimeToOneDetal(+e.target.value)}
						placeholder='Время на изготовление одной детали'
						aria-label="Time To One Detal"
						aria-describedby="timeToOneDetal"
					/>
					<InputGroup.Text>минут</InputGroup.Text>
				</InputGroup>

				<InputGroup className="mt-3 mb-3">
					<InputGroup.Text id="moneyQuantyOfERP">Оплата до вычетов налогов</InputGroup.Text>
					<Form.Control
						type='number'
						disabled
						value={moneyQuantyOfERP}
						onChange={e => setMoneyQuantyOfERP(+e.target.value)}
						placeholder='Оплата до вычетов налогов'
						aria-label="Money Quanty Of ERP"
						aria-describedby="moneyQuantyOfERP"
					/>
					<InputGroup.Text>грн</InputGroup.Text>
				</InputGroup>

				<InputGroup className="mt-3 mb-3">
					<InputGroup.Text id="moneyQuantyOfClean">Оплата на руки</InputGroup.Text>
					<Form.Control
						type='number'
						disabled={true}
						value={moneyQuantyOfClean}
						onChange={e => setMoneyQuantyOfClean(+e.target.value)}
						placeholder='Оплата на руки'
						aria-label="Money Quanty Of Clean"
						aria-describedby="moneyQuantyOfClean"
					/>
					<InputGroup.Text>грн</InputGroup.Text>
				</InputGroup>

				<input
					type="submit"
					value={'Добавить в список'}
					disabled={!isInputFull}
				/>
			</Form>



			<Button
				onClick={clearStoreHandle}
			>
				Очистить список
			</Button>

		</div>
	);
}

export default InputBlock;
