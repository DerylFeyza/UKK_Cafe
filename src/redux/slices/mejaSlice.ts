import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MejaDetail {
	id_meja: string;
	nomor_meja: string;
}

interface SelectedMeja {
	id_meja: string;
	nomor_meja: string;
}

interface MejaState {
	mejaList: MejaDetail[];
	selectedMeja: SelectedMeja | null;
}

const initialState: MejaState = {
	mejaList: [],
	selectedMeja: null,
};

const mejaSlice = createSlice({
	name: "mejaList",
	initialState,
	reducers: {
		addItemsToMejaList: (state, action: PayloadAction<MejaDetail[]>) => {
			state.mejaList = [...action.payload];
		},

		setSelectedMeja: (state, action: PayloadAction<SelectedMeja>) => {
			state.selectedMeja = action.payload;
		},
	},
});

export const { addItemsToMejaList, setSelectedMeja } = mejaSlice.actions;

export default mejaSlice.reducer;
