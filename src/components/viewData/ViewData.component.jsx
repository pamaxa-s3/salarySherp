import React, { useEffect, useState } from 'react';
import style from './ViewData.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDetailInfo } from '../../redux/store';

const ViewData = () => {


	const [isMore, setIsMore] = useState(false);
	const details = useDetailInfo(state => state.details);

	const [totalSalary, setTotalSalary] = useState(0);

	const getTotalSalary = () => {
		const allTotalSalary = [];

		details.forEach(({ timeOfTask, quantyOfTask, quantyOfReal, tarifClean }) => allTotalSalary.push(+(timeOfTask / quantyOfTask * quantyOfReal * tarifClean).toFixed(1)));
		return allTotalSalary.reduce((detailSalary, count) => count + detailSalary);
	}

	useEffect(() => { if (details.length !== 0) setTotalSalary(getTotalSalary()) }, [details]);

	return (
		<div className={style.table_block}>
			<Button variant="info" onClick={() => setIsMore(!isMore)}>{isMore ? 'Скрыть лишнее' : 'Показать больше'}</Button>
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Название</th>
						{isMore ? <th>Время в задании</th> : null}
						{isMore ? <th>Количество в задании</th> : null}
						<th>Количество сделанных</th>
						{isMore ? <th>Время на нужное количество</th> : null}
						{isMore ? <th>Время на одну деталь (минуты)</th> : null}
						{isMore ? <th>Ставка по ERP</th> : null}
						<th>Ставка чистая</th>
						{isMore ? <th>Сумма по ERP</th> : null}
						<th>Сумма чистыми</th>
					</tr>
				</thead>
				<tbody>
					{details.map((datail, index) => (
						<tr key={datail._id}>
							<td>{index + 1}</td>
							<td>{datail.title}</td>
							{isMore ? <td>{datail.timeOfTask}</td> : null}
							{isMore ? <td>{datail.quantyOfTask}</td> : null}
							<td>{datail.quantyOfReal}</td>
							{isMore ? <td>{(datail.timeOfTask / datail.quantyOfTask * datail.quantyOfReal).toFixed(1)}</td> : null}
							{isMore ? <td>{(datail.timeOfTask / datail.quantyOfTask * 60).toFixed(1)}</td> : null}
							{isMore ? <td>{datail.tarifERP}</td> : null}
							<td>{datail.tarifClean}</td>
							{isMore ? <td>{(datail.timeOfTask / datail.quantyOfTask * datail.quantyOfReal * datail.tarifERP).toFixed(1)}</td> : null}
							<td>{(datail.timeOfTask / datail.quantyOfTask * datail.quantyOfReal * datail.tarifClean).toFixed(1)}</td>
						</tr>
					))}
					<tr>
						<td>Итого</td>
						<td></td>
						<td></td>
						{isMore && <td></td>}
						{isMore && <td></td>}
						{isMore && <td></td>}
						{isMore && <td></td>}
						{isMore && <td></td>}
						{isMore && <td></td>}
						<td></td>
						<td>{totalSalary}</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}

export default ViewData;