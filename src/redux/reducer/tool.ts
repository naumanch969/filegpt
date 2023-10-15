import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tool } from "@/interfaces";


// Define the type for your state
interface CategoriesState {
    isFetching: boolean;
    error: null | Error;
    tools: Tool[];
    Categories: Tool[];
    currentTool: Tool;
    queryResponse:string
}

const initialState: CategoriesState = {
    isFetching: false,
    error: null,
    Categories: [],
    tools: [],
    currentTool: {
        _id: '',
        name: '',
        category: '',
        subcategory: '',
        webImage: '',
        mobileImage: '',
        inputFields: [
            {
                fieldName: '',
                placeholder: ''
            }
        ],
        systemRole: '',
        prompt: '',
        languageDropdown: ''
    },
    queryResponse: ''
};

const toolsSlice = createSlice({
    name: 'tool',
    initialState,
    reducers: {
        start: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        end: (state) => {
            state.isFetching = false;
        },
        error: (state, action: PayloadAction<Error>) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        getToolsReducer: (state, action: PayloadAction<Tool[]>) => {
            state.tools = action.payload;
        },
        setToolReducer: (state, action: PayloadAction<Tool>) => {
            state.currentTool = action.payload
        },
        queryToolReducer: (state, action: PayloadAction<string>) => {
            state.queryResponse = action.payload;
        },
        createToolReducer: (state, action: PayloadAction<Tool>) => {
            state.tools = [...state.tools, action.payload];
        },
        updateToolReducer: (state, action: PayloadAction<Tool>) => {
            state.tools = state.tools.map(tool => tool = tool._id == action.payload._id ? action.payload : tool);
        },
        deleteToolReducer: (state, action: PayloadAction<string>) => {
            state.tools = state.tools.filter((tool: Tool) => tool._id != action.payload);
        },
    },
});

export const {
    start,
    end,
    error,
    getToolsReducer,
    setToolReducer,
    queryToolReducer,
    createToolReducer,
    updateToolReducer,
    deleteToolReducer,
} = toolsSlice.actions;

export default toolsSlice.reducer;
