import { create } from 'zustand';
import { nanoid } from 'nanoid';

import { persist, createJSONStorage } from 'zustand/middleware'

export const useDetailInfo = create(
	persist(
		(set, get) => ({
			details: [],
			addDetail: (title, timeOfTask, quantyOfTask, quantyOfReal, tarifERP, tarifClean) => set(state => {
				const newDatail = {
					_id: nanoid(),
					title,
					timeOfTask,
					quantyOfTask,
					quantyOfReal,
					tarifERP,
					tarifClean
				};

				return {
					details: [newDatail, ...state.details]
				}
			}),
			clearStore: () => set(state => {
				return {
					details: []
				}
			}),
		}),
		{
			name: 'detail', // unique name
			storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
		}
	)
)